"use client";
import AdminPagination from "@/components/admin-component/AdminPagination";
import DataTable from "@/components/admin-component/DataTable";
import { Button } from "@/components/ui/button";
import { initials } from "@/helper/initials";
import { IUser } from "@/interfaces/user.interface";
import { getUsers } from "@/services/hooks/admin-auth";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye } from "iconsax-react";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const columnHelper = createColumnHelper<IUser>();

export default function Page() {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const itemsPerPage = 10;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue("");
  };

  const processedUsers = useMemo<IUser[]>(() => {
    if (!data?.users) return [];

    let filtered = data.users as IUser[];

    if (searchValue) {
      filtered = filtered.filter(
        (user) =>
          user?.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user?.lastName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user?.phoneNumber?.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return filtered;
  }, [data?.users, searchValue]);

  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(
    () =>
      processedUsers.slice(
        (currentPageIndex - 1) * itemsPerPage,
        currentPageIndex * itemsPerPage,
      ),
    [processedUsers, currentPageIndex],
  );

  useEffect(() => {
    if (currentPageIndex > totalPages && totalPages > 0) {
      setCurrentPageIndex(totalPages);
    }
  }, [totalPages, currentPageIndex]);

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "customerName",
      cell: ({ row }) => {
        const fullName = `${row.original.lastName} ${row.original.firstName}`;
        return (
          <div className="grid grid-cols-[50px_1fr] items-center gap-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
              <span className="text-white">{initials(fullName)}</span>
            </div>
            <Link href={`/admin/customers/${row.original?._id}`}>
              <span className="text-[15px]">{fullName}</span>
            </Link>
          </div>
        );
      },
      header: () => <span>Customers</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: ({ row }) => (
        <span className="text-[15px]">{row.original?.email}</span>
      ),
      header: () => <span>Email Address</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.phoneNumber, {
      id: "phoneNumber",
      cell: ({ row }) => (
        <span className="text-[15px]">
          {row.original?.phoneNumber ? `+${row.original.phoneNumber}` : "N/A"}
        </span>
      ),
      header: () => <span>Contact Number</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor((row) => row.createdAt, {
      id: "createdAt",
      cell: ({ row }) => {
        return (
          <span className="text-[15px]">
            {moment(row.original.createdAt).format("MMM DD, YYYY HH:mm A")}
          </span>
        );
      },
      header: () => <span>Date Onboarded</span>,
    }),

    // columnHelper.accessor("orders", {
    //   cell: (info) => <span>{info.row.original.orders ?? 0}</span>,
    //   header: () => <span>Orders</span>,
    //   footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor((row) => row, {
    //   id: "amountSpent",
    //   cell: ({ row }) => (
    //     <span>
    //       &euro;{formatCurrency(row.original.amountSpent, "en-NG") ?? 0}
    //     </span>
    //   ),
    //   header: () => <span>Amount Spent</span>,
    //   footer: (info) => info.column.id,
    // }),

    columnHelper.accessor((row) => row, {
      id: "action",
      cell: ({ row }) => (
        <div className="inline-flex items-center ">
          <Link
            href={`/admin/customers/${row.original?._id}`}
            className="cursor-pointer text-blue-700"
          >
            <Eye size={20} />
          </Link>
        </div>
      ),
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];
  return (
    <>
      <section className="min-h-screen w-full bg-[#EFEFEF] px-4 py-6">
        <h1 className="text-lg font-extrabold uppercase">Customers</h1>
        <hr className="my-3 mb-8 hidden border-0 border-t border-[#D4D4D4] md:block" />

        <div className="my-6 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          {/* search input */}
          <div className="w-full max-w-[500px]">
            <label htmlFor="search" className="relative block w-full">
              <input
                value={searchValue}
                type="text"
                name="search"
                autoComplete="search"
                placeholder="Search..."
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
        </div>

        {isPending ? (
          <div className="flex w-full items-center justify-center py-10">
            <Loader2Icon className="mr-2 animate-spin" />
            <p>Fetching Customers...</p>
          </div>
        ) : isError ? (
          <div className="py-5 text-center">
            <p className="mb-4 text-center text-red-500">
              Failed to load customers. Please try again.
            </p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        ) : processedUsers.length > 0 ? (
          <>
            <div className="hidden md:block">
              <DataTable
                columns={columns}
                data={paginatedUsers}
                currentPage={currentPageIndex}
                totalPages={totalPages}
                setCurrentPage={setCurrentPageIndex}
              />
            </div>
            <div className="block md:hidden">
              <div className="grid gap-5">
                {paginatedUsers.map((item, index) => (
                  <div key={index} className="bg-white p-4 py-6">
                    <div className="mt-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center">
                          <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-goldie-300">
                            {initials(`${item.firstName} ${item.lastName}`)}
                          </div>
                          <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                              <Link
                                href={`/admin/customers/${item?._id}`}
                              >
                                <h3 className="whitespace-nowrap font-bold">
                                  {`${item.firstName} ${item.lastName}`}
                                </h3>
                              </Link>
                              <span className="text-sm">
                                {item.phoneNumber || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex w-full items-end justify-between">
                          <span className="text-sm">
                            Joined:{" "}
                            {moment(item.createdAt).format("MMM DD, YYYY")}
                          </span>
                          <button
                            className="bg-black px-5 py-2 text-sm text-goldie-300"
                            onClick={() =>
                              router.push(`/admin/customers/${item._id}`)
                            }
                          >
                            More Info
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <AdminPagination
                  totalPage={totalPages}
                  page={currentPageIndex}
                  setPage={setCurrentPageIndex}
                />
              )}
            </div>
          </>
        ) : (
          <div>
            <p className="text-center text-gray-500">No customers found.</p>
          </div>
        )}
      </section>
    </>
  );
}
