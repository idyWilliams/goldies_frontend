"use client";
import AdminTable from "@/components/admin-component/AdminTable";
import { productList } from "@/utils/adminData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import ProductOptionModal from "@/components/admin-component/ProductOptionModal";
import { setProducts } from "@/redux/features/product/productSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MenuPopup from "@/components/MenuPopup";
import ProductSortBy from "@/components/admin-component/ProductSortBy";
import AdminAuth from "@/components/admin-component/AdminAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/hooks/products";

type Product = {
  id: string;
  image: any;
  productName: string;
  addedDate: string;
  category: string;
  priceFrom: number;
  priceTo: number;
  quantity: number;
  status: string;
};

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
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

const columnHelper = createColumnHelper<Product>();

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any>();
  const [isOpen, setOpen] = useState(false);
  const [sortType, setSortType] = useState("recentlyAdded");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(productList);

  const router = useRouter();
  const handleAddNew = () => {
    router.push(`/admin/create-products`);
  };

  const allProducts = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => getAllProducts(1, 15),
  });

  console.log(allProducts?.data);

  useEffect(() => {
    const sortProducts = (type: string) => {
      switch (type) {
        case "recentlyAdded":
          setData(
            productList
              .slice()
              .sort(
                (a: any, b: any) =>
                  new Date(b.addedDate).getTime() -
                  new Date(a.addedDate).getTime(),
              ),
          );
          return;
        case "highToLow":
          setData(
            productList
              .slice()
              .sort((a: any, b: any) => b.priceFrom - a.priceFrom),
          );
          return;
        case "lowToHigh":
          setData(
            productList
              .slice()
              .sort((a: any, b: any) => a.priceFrom - b.priceFrom),
          );
          return;
        case "available":
          setData(productList.filter((a: any) => a.status === "available"));
          return;
        default:
          setData(productList);
          return;
      }
    };

    sortProducts(sortType);
  }, [sortType]);
  useEffect(() => {
    const filteredProducts = productList?.filter(
      (item: any) =>
        item?.productName.toLowerCase().includes(searchValue) ||
        item?.id.toString().toLowerCase().includes(searchValue),
    );
    setData(filteredProducts);
  }, [searchValue]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log(value, "value");
  };
  const columns = [
    columnHelper.accessor((row) => row, {
      id: "productName",
      cell: (info) => {
        return (
          <div className="grid grid-cols-[50px_1fr] gap-2">
            <Image
              src={info.cell.row.original?.image[0]}
              alt={info.cell.row.original.productName}
            />
            <div className="flex flex-col">
              <h3 className="whitespace-nowrap font-bold">
                {info.cell.row.original.productName}
              </h3>
              <span>ID:&nbsp;{info.cell.row.original.id}</span>
            </div>
          </div>
        );
      },
      header: () => <span>Product</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.category, {
      id: "category",
      cell: (info) => (
        <span className="whitespace-nowrap capitalize">{info.getValue()}</span>
      ),
      header: () => <span>Category</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "price",
      cell: (info) => (
        <span className="whitespace-nowrap">
          &euro;{info.cell.row.original.priceFrom} - &euro;
          {info.cell.row.original.priceTo}
        </span>
      ),
      header: () => <span>Product</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("addedDate", {
      header: () => <span>AddedDate</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("quantity", {
      header: () => <span>Qnty</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "status",
      cell: (info) => statusColor(info.cell.row.original.status),
      header: () => <span>Status</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      cell: (info) => {
        // console.log(info, "info");
        return (
          <div className="inline-flex items-center gap-3">
            <Link
              href={`/admin/products/${info.cell.row.original.id}`}
              className="cursor-pointer text-blue-700"
            >
              <Eye size={20} />
            </Link>
            <span
              onClick={() => {
                setShowModal(true);
                setAction("edit");
                setSelectedProducts(info.cell.row.original);
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
                setSelectedProducts(info.cell.row.original);
              }}
            >
              <Trash size={20} />
            </span>
          </div>
        );
      },
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];
  return (
    <>
      <section className="w-full px-4 pt-6">
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

        <div className="my-6 flex items-center justify-between gap-2 md:hidden">
          <label htmlFor="search" className="relative block w-[500px] ">
            <input
              value={searchValue}
              type="text"
              name="search"
              autoComplete="search"
              placeholder="search for product name, product ID..."
              className="w-full rounded-[50px] px-4 py-1 placeholder:text-xs focus:border-black focus:ring-black lg:py-2"
              onChange={(e) => handleChange(e)}
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

        <div className="hidden md:block md:overflow-x-scroll">
          <ProductTable
            columns={columns}
            Tdata={productList}
            statusType="product"
            filteredTabs={["All", "Available", "Unavailable", "Disabled"]}
          />
        </div>
        <div className="block space-y-5 md:hidden">
          {data.map((product: any, index: number) => (
            <MobileProductCard data={product} key={index} />
          ))}
        </div>
      </section>
      {showModal && (
        <ProductOptionModal
          action={action}
          product={selectedProducts}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
