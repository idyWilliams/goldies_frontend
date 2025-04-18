"use client";

import AdminPagination from "@/components/admin-component/AdminPagination";
import DataTable from "@/components/admin-component/DataTable";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import { Button } from "@/components/ui/button";
import EachElement from "@/helper/EachElement";
import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder, OrderParams } from "@/interfaces/order.interface";
import { cn } from "@/lib/utils";
import { getOrdersByUser } from "@/services/hooks/payment";
import useSpecificUserOrders from "@/services/hooks/payment/useSpecificUserOrders";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const itemsPerPage = 10;

  const [params, setParams] = useState<OrderParams>({
    page: currentPage,
    limit: itemsPerPage,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    const newParams: OrderParams = {
      page: currentPage,
      limit: itemsPerPage,
      status: selectedStatus === "All" ? "" : selectedStatus.toLowerCase(),
    };

    if (debouncedSearchValue) {
      newParams.searchQuery = debouncedSearchValue;
    }

    // Update URL with new search query and page
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", currentPage.toString());

    if (currentPage !== 1) {
      currentParams.set("page", currentPage.toString());
    } else {
      currentParams.delete("page");
    }

    if (debouncedSearchValue) {
      currentParams.set("search", debouncedSearchValue);
    } else {
      currentParams.delete("search");
    }

    if (selectedStatus !== "All") {
      currentParams.set("status", selectedStatus.toLowerCase());
    } else {
      currentParams.delete("status");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
    setParams(newParams);
  }, [
    currentPage,
    searchValue,
    debouncedSearchValue,
    pathname,
    router,
    searchParams,
    selectedStatus,
  ]);

  const { orders, isLoading, isError, refetch, totalPages, totalOrders } =
    useSpecificUserOrders(params);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
    setDebouncedSearchValue("");
  };

  const filteredTabs = ["All", "Pending", "Completed", "Cancelled"];

  return (
    <section className="bg-brand-100 py-6">
      <div className="wrapper">
        <h1 className="mb-8 border-b pb-3 text-2xl font-semibold">
          All Orders
        </h1>

        <div className="my-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* search input */}
          <div className="w-full max-w-[500px]">
            <label htmlFor="search" className="relative block w-full">
              <input
                value={searchValue}
                type="text"
                name="search"
                autoComplete="search"
                placeholder="Search Order ID..."
                className="w-full rounded-[50px] px-4 py-2 pr-10 placeholder:text-sm focus:border-black focus:ring-black"
                onChange={handleChange}
              />
              {searchValue ? (
                <button
                  onClick={clearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <IoMdClose />
                </button>
              ) : (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CiSearch />
                </span>
              )}
            </label>
          </div>

          {/* Filter Tabs */}
          <div
            className={cn("flex items-center justify-between gap-2 p-[2px]")}
          >
            <div className="flex items-center gap-1">
              {filteredTabs?.map((tab, index) => (
                <button
                  key={index}
                  className={`w-fit rounded-sm border px-2 ${
                    selectedStatus === tab
                      ? "bg-brand-200 text-brand-100"
                      : "border-brand-200 bg-brand-100"
                  }`}
                  onClick={() => setSelectedStatus(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
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
        ) : orders && orders.length > 0 ? (
          <>
            <div className="hidden lg:block">
              <DataTable
                columns={columns}
                data={orders}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>

            <div className="lg:hidden">
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <EachElement
                  of={orders}
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
                              <span>{order?.orderedItems.length} products</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center justify-between">
                              <span>Amount</span>
                              <span>
                                <span>
                                  {formatCurrency(order?.fee.subTotal, "en-NG")}
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
                                className="inline-flex items-center gap-2 bg-neutral-900 px-2 py-1 text-sm text-brand-200"
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
  );
};

export default MyOrders;
