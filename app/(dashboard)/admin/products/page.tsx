"use client";
import AdminTable from "@/components/admin-component/AdminTable";
import { productList } from "@/utils/adminData";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Column } from "react-table";
import {
  ColumnDef,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import ProductTable from "@/components/admin-component/ProductTable";
import {
  Add,
  ArrowDown,
  ArrowDown2,
  Data,
  Edit,
  Eye,
  Trash,
} from "iconsax-react";
import MobileProductCard from "@/components/admin-component/MobileProductCard";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductOptionModal from "@/components/admin-component/ProductOptionModal";
import { setProducts } from "@/redux/features/product/productSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MenuPopup from "@/components/MenuPopup";
import ProductSortBy from "@/components/admin-component/ProductSortBy";
import AdminAuth from "@/components/admin-component/AdminAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/hooks/products";
import { Button } from "@/components/ui/button";
import { IProduct, ProductParams } from "@/interfaces/product.interface";
import { Loader2Icon } from "lucide-react";
import momemt from "moment";
import { formatCurrency } from "@/helper/formatCurrency";
import DataTable from "@/components/admin-component/DataTable";
import useProducts from "@/services/hooks/products/useProducts";

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

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct>();
  const [isOpen, setOpen] = useState(false);
  const [sortType, setSortType] = useState("recentlyAdded");
  const [searchValue, setSearchValue] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const itemsPerPage = 10;

  const handleAddNew = () => {
    router.push(`/admin/create-products`);
  };

  const [params, setParams] = useState<ProductParams>({
    page: currentPageIndex,
    limit: itemsPerPage,
  });

  useEffect(() => {
    const newParams: ProductParams = {
      page: currentPageIndex,
      limit: itemsPerPage,
      searchQuery: searchValue,
    };

    // Update URL with new search query and page
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", currentPageIndex.toString());

    if (searchValue) {
      currentParams.set("searchQuery", searchValue);
    } else {
      currentParams.delete("searchQuery");
    }

    router.push(`${pathname}?${currentParams.toString()}`);
    setParams(newParams);
  }, [currentPageIndex, searchValue, pathname, router, searchParams]);

  const {
    isLoading,
    isError,
    refetch,
    totalPages,
    products: allProducts,
  } = useProducts(params);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const columns = [
    columnHelper.accessor((row) => row, {
      id: "productName",
      cell: (info) => {
        return (
          <div className="grid grid-cols-[50px_1fr] gap-2">
            <Image
              width={300}
              height={300}
              className="h-[50px] w-full object-cover object-center"
              src={info.cell.row.original?.images[0]}
              alt={info.cell.row.original.name}
            />
            <div className="flex flex-col">
              <h3 className="whitespace-nowrap font-bold">
                {info.cell.row.original.name}
              </h3>
              <span className="uppercase">
                ID:&nbsp;{info.cell.row.original._id.slice(0, 6)}
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
        <span className="whitespace-nowrap capitalize">
          {info.cell.row.original.category.name}
        </span>
      ),
      header: () => <span>Category</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "price",
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {formatCurrency(parseInt(row.original.minPrice), "en-NG")} -{" "}
          {formatCurrency(parseInt(row.original.maxPrice), "en-NG")}
        </span>
      ),
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Added Date</span>,
      cell: ({ row }) => (
        <span className="text-nowrap">
          {momemt(row.original.createdAt).format("MMM DD, YYYY HH:mm A")}
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
      <div className="flex items-center justify-between">
        <div className="mb-5">
          <h1 className="text-lg font-extrabold">Products</h1>
          <p className="text-sm">List of all available products created</p>
        </div>
        <button
          className="flex cursor-pointer items-center gap-2 rounded-md bg-black px-5 py-2.5 text-sm text-goldie-300"
          onClick={handleAddNew}
        >
          <Add size={15} /> ADD NEW
        </button>
      </div>

      {/* Search and Sort */}
      <div className="my-6 flex items-center justify-between gap-2 md:hidden">
        <label htmlFor="search" className="relative block w-[500px]">
          <input
            value={searchValue}
            type="text"
            name="search"
            autoComplete="search"
            placeholder="search for product name, product ID..."
            className="w-full rounded-[50px] px-4 py-1 placeholder:text-xs focus:border-black focus:ring-black lg:py-2"
            onChange={handleChange}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <CiSearch />
          </span>
        </label>

        <button
          className="relative flex min-w-[83px] cursor-pointer items-center justify-between rounded-md bg-black px-3 py-2 text-[10px] text-goldie-300 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          Sort by {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {isOpen && (
          <ProductSortBy setSortType={setSortType} sortType={sortType} />
        )}
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
              filteredTabs={[
                "All",
                "Available",
                "Unavailable",
                "Disabled",
                "Out of Stock",
              ]}
              statusKey="status"
              searchKeys={["name", "category", "subCategory"]}
              currentPage={currentPageIndex}
              totalPages={totalPages}
              setCurrentPage={setCurrentPageIndex}
            />
          </div>
          <div className="block space-y-5 md:hidden">
            {allProducts.map((product: IProduct, index: number) => (
              <MobileProductCard data={product} key={index} />
            ))}
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
