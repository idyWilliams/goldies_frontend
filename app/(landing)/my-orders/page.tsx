"use client";

import AdminPagination from "@/components/admin-component/AdminPagination";
import DataTable from "@/components/admin-component/DataTable";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import { Button } from "@/components/ui/button";
import EachElement from "@/helper/EachElement";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder } from "@/interfaces/order.interface";
import { getOrderByUser } from "@/services/hooks/payment";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const columnHelper = createColumnHelper<IOrder>();
const columns = [
  columnHelper.accessor("orderId", {
    header: "Order ID",
    cell: (info) => <span className="text-[15px]">{info.getValue()}</span>,
  }),
  columnHelper.accessor("createdAt", {
    header: "Order Date",
    cell: ({ row }) => (
      <span className="text-[15px]">
        {moment(row.original?.createdAt).format("MMM DD, YYYY HH:mm A")}
      </span>
    ),
  }),
  columnHelper.accessor("orderedItems", {
    header: "Quantity",
    cell: (info) => (
      <span className="text-[15px]">{info.getValue().length} products</span>
    ),
  }),
  columnHelper.accessor("fee.total", {
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-[15px]">
        {formatCurrency(row.original.fee.total, "en-NG")}
      </span>
    ),
  }),
  columnHelper.accessor("fee.deliveryFee", {
    header: "Shipping",
    cell: ({ row }) => (
      <span className="text-[15px]">
        {formatCurrency(row.original.fee.deliveryFee, "en-NG")}
      </span>
    ),
  }),
  columnHelper.accessor("orderStatus", {
    header: "Status",
    cell: (info) => <StatusColumn status={info.getValue()} />,
  }),
  columnHelper.accessor((row) => row, {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-center text-neutral-600">
        <Link href={`/my-orders/${row.original._id}`}>
          <Eye />
        </Link>
      </div>
    ),
  }),
];


const MyOrders = () => {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedTabs, setSelectedTabs] = useState("All");
  const [filteredData, setFilteredData] = useState<IOrder[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: ordersResponse,
    isPending,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orderByUser"],
    queryFn: getOrderByUser,
  });

  const processedOrders = useMemo<IOrder[]>(() => {
    if (!ordersResponse?.userOrder) return [];

    let filtered = ordersResponse?.userOrder as IOrder[];
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (order) =>
          order.orderStatus.toLowerCase() === selectedStatus.toLowerCase(),
      );
    }
    return filtered;
  }, [ordersResponse?.userOrder, selectedStatus]);

  const totalPages = Math.ceil(processedOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(
    () =>
      processedOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      ),
    [processedOrders, currentPage],
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <>
      <div className="mt-[64px]" />
      <section className="bg-neutral-100 py-6">
        <div className="wrapper">
          <h1 className="mb-8 border-b pb-3 text-2xl font-semibold">
            All Orders
          </h1>

          {isPending ? (
            <div className="flex w-full items-center justify-center py-10">
              <Loader2Icon className="mr-2 animate-spin" />
              <p>Fetching Your Orders...</p>
            </div>
          ) : isError ? (
            <div className="py-5 text-center">
              <p className="mb-4 text-center text-red-500">
                Failed to load orders. Please try again.
              </p>

              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          ) : processedOrders.length > 0 ? (
            <>
              <div className="hidden lg:block">
                <DataTable
                  columns={columns}
                  data={paginatedOrders}
                  filteredTabs={["All", "Pending", "Completed", "Cancelled"]}
                  statusKey="orderStatus"
                  searchKeys={["orderId"]}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>

              <div className="lg:hidden">
                <div className="flex gap-1">
                  <EachElement
                    of={["All", "Pending", "Delivered", "Cancelled"]}
                    render={(tabs: string, index: number) => (
                      <button
                        key={index}
                        className={`w-fit rounded-sm border px-2 ${selectedTabs === tabs ? "bg-black text-goldie-300" : "border-neutral-200 bg-white"}`}
                        onClick={() => {}}
                      >
                        {tabs}
                      </button>
                    )}
                  />
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <EachElement
                    of={paginatedOrders}
                    render={(order: IOrder, index: number) => {
                      return (
                        <div key={index} className="rounded-md bg-white p-4">
                          <ul className="space-y-3">
                            <li>
                              <div className="flex items-center justify-between">
                                <span>{order?.orderId}</span>
                                {/* <span>{orders.orderId}</span> */}
                                <span>
                                  <StatusColumn status={order?.orderStatus} />
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                                <span>Order Quantity</span>
                                <span>
                                  {order?.orderedItems.length} products
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center justify-between">
                                <span>Amount</span>
                                <span>
                                  <span>
                                    {formatCurrency(
                                      order?.fee.subTotal,
                                      "en-NG",
                                    )}
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                                <span>Shipping</span>
                                <span>
                                  <span>
                                    {formatCurrency(
                                      order?.fee.deliveryFee,
                                      "en-NG",
                                    )}
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center justify-between border-t pt-2">
                                <span>Total</span>
                                <span>
                                  <span>
                                    {formatCurrency(order?.fee?.total, "en-NG")}
                                  </span>
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center justify-between">
                                <span>Date:</span>
                                <button
                                  onClick={() =>
                                    router.push(`/my-orders/${order?._id}`)
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

                {totalPages > 1 && (
                  <AdminPagination
                    totalPage={totalPages}
                    page={currentPage}
                    setPage={setCurrentPage}
                  />
                )}
              </div>
            </>
          ) : (
            <div>
              <p className="text-center text-gray-500">You have no orders</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyOrders;
