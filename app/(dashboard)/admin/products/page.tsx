"use client";
import AdminPagination from "@/components/admin-component/AdminPagination";
import DataTable from "@/components/admin-component/DataTable";
import MobileProductCard from "@/components/admin-component/MobileProductCard";
import ProductOptionModal from "@/components/admin-component/ProductOptionModal";
import ProductSortBy from "@/components/admin-component/ProductSortBy";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helper/formatCurrency";
import { IProduct, ProductParams } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import useProducts from "@/services/hooks/products/useProducts";
import { createColumnHelper } from "@tanstack/react-table";
import { Add, Edit, Eye, Trash } from "iconsax-react";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";

const statusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "available":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-green-700 bg-green-700 bg-opacity-10 px-3 py-[2px] text-sm text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-700"></span>
          Available
        </div>
      );
    case "unavailable":
      return (
        <div className="inline-flex items-center gap-2 rounded-[50px] border border-red-700 bg-red-700 bg-opacity-10 px-3 py-[2px] text-sm text-red-700">
          <span className="h-2 w-2 rounded-full bg-red-700"></span> Unavailable
        </div>
      );
    default:
      return;
  }
};

const columnHelper = createColumnHelper<IProduct>();

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const querySortBy = searchParams.get("sortBy") || "default";
  const queryOrder = searchParams.get("order") || "asc";

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const itemsPerPage = 10;
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const [sortBy, setSortBy] = useState<string>(querySortBy);
  const [order, setOrder] = useState<string>(queryOrder);

  const handleAddNew = () => {
    router.push(`/admin/create-products`);
  };

  const [params, setParams] = useState<ProductParams>({
    page: currentPageIndex,
    limit: itemsPerPage,
    sortBy: querySortBy,
    order: queryOrder,
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
    const newParams: ProductParams = {
      page: currentPageIndex,
      limit: itemsPerPage,
    };

    if (searchValue) {
      newParams.searchQuery = searchValue;
    }

    // Only include sortBy and order if they are not default
    if (sortBy !== "default") {
      newParams.sortBy = sortBy;
      newParams.order = order;
    }

    // Update URL with new search query and page
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", currentPageIndex.toString());

    if (currentPageIndex !== 1) {
      currentParams.set("page", currentPageIndex.toString());
    } else {
      currentParams.delete("page");
    }

    if (debouncedSearchValue) {
      currentParams.set("searchQuery", debouncedSearchValue);
    } else {
      currentParams.delete("searchQuery");
    }

    if (sortBy !== "default") {
      currentParams.set("sortBy", sortBy);
      currentParams.set("order", order);
    } else {
      currentParams.delete("sortBy");
      currentParams.delete("order");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
    setParams(newParams);
  }, [
    currentPageIndex,
    searchValue,
    debouncedSearchValue,
    pathname,
    router,
    searchParams,
    sortBy,
    order,
  ]);

  const {
    isLoading,
    isError,
    refetch,
    totalPages,
    products: allProducts,
  } = useProducts(params);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const clearInput = () => {
    setSearchValue("");
    setDebouncedSearchValue("");
    setCurrentPageIndex(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "productName",
      cell: ({ row }) => {
        return (
          <div className="grid grid-cols-[50px_1fr] gap-2">
            <Image
              width={300}
              height={300}
              className="h-[50px] w-full object-cover object-center"
              src={row.original?.images[0]}
              alt={row.original.name}
            />
            <div className="flex flex-col">
              <Link href={`/admin/products/${row.original._id}`}>
                <p className="whitespace-nowrap text-[15px] font-bold">
                  {row.original.name}
                </p>
              </Link>
              <span className="text-sm uppercase">
                {row.original.productCode}
              </span>
            </div>
          </div>
        );
      },
      header: () => <span>Product</span>,
    }),
    columnHelper.accessor((row) => row.category, {
      id: "category",
      cell: (info) => (
        <span className="whitespace-nowrap text-[15px] capitalize">
          {info.cell.row.original.category.name}
        </span>
      ),
      header: () => <span>Category</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "price",
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-[15px]">
          {formatCurrency(parseInt(row.original.minPrice), "en-NG")} -{" "}
          {formatCurrency(parseInt(row.original.maxPrice), "en-NG")}
        </span>
      ),
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Added Date</span>,
      cell: ({ row }) => (
        <span className="text-nowrap text-[15px]">
          {moment(row.original.createdAt).format("MMM DD, YYYY HH:mm A")}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row, {
      id: "status",
      cell: (info) => statusColor(info.cell.row.original?.status),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: ({ row }) => {
        // console.log(info, "info");
        return (
          <div className="inline-flex items-center gap-3">
            <Link
              href={`/admin/products/${row.original._id}`}
              className="cursor-pointer text-blue-700"
            >
              <Eye size={20} />
            </Link>
            <span
              onClick={() => {
                setShowModal(true);
                setAction("edit");
                setSelectedProduct(row.original);
              }}
              className="cursor-pointer text-green-700"
            >
              <Edit size={20} />
            </span>
            <span
              className="cursor-pointer text-red-700"
              onClick={() => {
                setShowModal(true);
                setAction("delete");
                setSelectedProduct(row.original);
              }}
            >
              <Trash size={20} />
            </span>
          </div>
        );
      },
      header: () => <span>Actions</span>,
    }),
  ];

  return (
    <div className="h-full w-full px-4 pt-6">
      {/* top heading */}
      <div className="flex items-start justify-between gap-6 ">
        <div className="mb-5">
          <h1 className="text-lg font-extrabold uppercase">Products</h1>
          <p className="text-sm">List of all available products created</p>
        </div>
        <Button
          className="flex cursor-pointer items-center gap-1 rounded-md bg-black text-goldie-300"
          onClick={handleAddNew}
        >
          <Add size={15} />
          <span>New Product</span>
        </Button>
      </div>

      {/* Search and Sort */}
      <div className="my-6 flex items-center justify-between gap-2 ">
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

        <div ref={sortDropdownRef} className="relative">
          <Button
            className="bg-black text-goldie-300 "
            onClick={() => setOpen((prev) => !prev)}
            disabled={allProducts.length === 0}
          >
            Sort by{" "}
            {!isOpen ? (
              <IoIosArrowDown className="ml-2" />
            ) : (
              <IoIosArrowUp className="ml-2" />
            )}
          </Button>
          {isOpen && (
            <ProductSortBy
              sortBy={sortBy}
              order={order}
              onSortChange={(sortBy, order) => {
                setSortBy(sortBy);
                setOrder(order);
                setCurrentPageIndex(1);
              }}
              setOpen={setOpen}
            />
          )}
        </div>
      </div>

      {/* Products Table */}

      {isLoading ? (
        <div className="flex w-full items-center justify-center py-10">
          <Loader2Icon className="mr-2 animate-spin" />
          <p>Fetching Products...</p>
        </div>
      ) : isError ? (
        <div className="py-5 text-center text-red-500">
          <p className="mb-4 text-center text-red-500">
            Failed to load products. Please try again.
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      ) : allProducts.length > 0 ? (
        <>
          <div className="hidden md:block md:overflow-x-scroll">
            <DataTable
              columns={columns}
              data={allProducts}
              currentPage={currentPageIndex}
              totalPages={totalPages}
              setCurrentPage={setCurrentPageIndex}
            />
          </div>
          <div className="block space-y-5 md:hidden">
            {allProducts.map((product: IProduct, index: number) => (
              <MobileProductCard data={product} key={index} />
            ))}

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
          <p className="text-center text-gray-500">No products found.</p>
        </div>
      )}

      {showModal && (
        <ProductOptionModal
          action={action}
          product={selectedProduct as IProduct}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
