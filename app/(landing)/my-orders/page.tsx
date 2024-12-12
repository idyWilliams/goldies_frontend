"use client";

import ProductTable from "@/components/admin-component/ProductTable";
import Pagination from "@/components/custom-filter/Pagination";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import EachElement from "@/helper/EachElement";
import { chunkArray } from "@/helper/chunkArray";
import { getOrderByUser } from "@/services/hooks/payment";
import { Order, recentOrders } from "@/utils/adminData";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";

const columnHelper = createColumnHelper<Order>();
const columns = [
  columnHelper.accessor("id", {
    header: "Order ID",
    cell: (info) => <span>#GOL{info.getValue()?.slice(0, 4)}</span>,
  }),
  columnHelper.accessor("date", {
    header: "Order Date",
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => <span>{info.getValue()} products</span>,
  }),
  columnHelper.accessor("price", {
    header: "Amount",
    cell: (info) => <span>&euro;{info.getValue()}</span>,
  }),
  columnHelper.accessor("shippingFee", {
    header: "Shipping",
    cell: (info) => <span>&euro;{info.getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <StatusColumn status={info.getValue()} />,
  }),
  columnHelper.accessor((row) => row, {
    id: "action",
        header: () => <div className="text-center">Action</div>,
    cell: (info) => (
      <div className="flex justify-center text-neutral-600">
        <Link href={`/my-orders/${info.cell.row.original.id}`}>
          <Eye />
        </Link>
      </div>
    ),
  }),
];

let itemsPerPage = 6;

const MyOrders = () => {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [selectedTabs, setSelectedTabs] = useState("All");
  const [filteredData, setFilteredData] = useState<Order[]>([]);
  const { data: ordersResponse, isPending, isSuccess, isError, } = useQuery({
    queryKey: ["orderByUser"],
    queryFn: getOrderByUser,
  });
  
  useEffect(() => {
    if (ordersResponse?.userOrder) {
      const transformedOrders = ordersResponse.userOrder.map((order: any) => ({
        id: order._id, 
        date: new Date(order?.createdAt).toISOString().split('T')[0], 
        quantity: order.orderedItems.length, 
        price: order.fee.total, 
        shippingFee: order.fee.deliveryFee, 
        status: order.orderStatus, 
      }));

      setMyOrders(transformedOrders);
      setFilteredData(transformedOrders);
      console.log("Transformed Orders:", transformedOrders);
      // console.log("Filtered Data:", filteredData);
    }
    
  }, [ordersResponse]);

  
  const handleTabClick = (status: string) => {
  setSelectedTabs(status);
  if (status === "All") {
    setFilteredData(recentOrders);
  } else {
    setFilteredData(
      recentOrders.filter(
        (order) => order.status.toLowerCase() === status.toLowerCase(),
      ),
    );
  }
};

  const handleNext = () => {
    if (currentPageIndex !== chunkArray(filteredData, itemsPerPage).length) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  const handlePaginateClick = (index: number) => {
    setCurrentPageIndex(index + 1);
    window.scroll(0, 0);
  };

  const handlePrev = () => {
    if (currentPageIndex !== 1) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };


  return (
    <>
      <div className="mt-[64px]" />
      <section className="bg-neutral-100 py-6">
        <div className="wrapper">
          <h1 className="mb-8 border-b pb-3 text-2xl font-semibold">
            All Orders
          </h1>

          <div className="lg:hidden">
            <div className="flex gap-1">
              <EachElement
                of={["All", "Pending", "Delivered", "Cancelled"]}
                render={(tabs: string, index: number) => (
                  <button
                    key={index}
                    className={`w-fit rounded-sm border px-2 ${selectedTabs === tabs ? "bg-black text-goldie-300" : "border-neutral-200 bg-white"}`}
                    onClick={() => {
                      handleTabClick(tabs);
                    }}
                  >
                    {tabs}
                  </button>
                )}
              />
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <EachElement
                of={
                  chunkArray(filteredData, itemsPerPage)[currentPageIndex - 1]
                }
                render={(order: any, index: any) => {
                  return (
                    <div key={index} className="rounded-md bg-white p-4">
                      <ul className="space-y-3">
                        <li>
                          <div className="flex items-center justify-between">
                            <span>Order ID: #GOL{order?.id.slice(0, 4)}</span>
                            {/* <span>{orders.orderId}</span> */}
                            <span>
                              <StatusColumn status={order?.status} />
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                            <span>Order Quantity</span>
                            <span>{order?.quantity} products</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between">
                            <span>Amount</span>
                            <span>
                              <span>&euro;{order?.price}</span>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                            <span>Shipping</span>
                            <span>
                              <span>&euro;{order?.shippingFee}</span>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between border-t pt-2">
                            <span>Total</span>
                            <span>
                              <span>
                                &euro;{order?.shippingFee + order?.price * 1}
                              </span>
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center justify-between">
                            <span>Date:</span>
                            <button
                              onClick={() =>
                                router.push(`/my-orders/${order?.id}`)
                              }
                              className="inline-flex items-center gap-2 bg-neutral-900 px-2 py-1 text-sm text-goldie-300"
                            >
                              <span>View</span> <Eye size={20} />
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                }}
              />
            </div>

            <Pagination
              className="bg-transparent"
              onNext={handleNext}
              onPrev={handlePrev}
              onPaginateClick={handlePaginateClick}
              itemsPerPage={itemsPerPage}
              currentPageIndex={currentPageIndex}
              arr={filteredData}
            />
          </div>

          <div className="hidden lg:block">
            <ProductTable
              columns={columns}
              Tdata={filteredData || []} 
              statusType="order"
              filteredTabs={["All", "Pending", "Delivered", "Cancelled"]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrders;


