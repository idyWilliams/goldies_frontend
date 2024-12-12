"use client";
import { ArrowLeft, Eye } from "iconsax-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StatusColumn from "@/components/myOrdersComps/StatusColumn";
import RedVelvet from "@/public/assets/red-velvet-cake.webp";
import Chocolate from "@/public/assets/birthday-cake.webp";
import Image from "next/image";
import ProductTable from "@/components/admin-component/ProductTable";
import { createColumnHelper } from "@tanstack/react-table";
import { recentOrders } from "@/utils/adminData";
import { useQuery } from "@tanstack/react-query";
import { getOrderByOrderId } from "@/services/hooks/payment";

type MyOrderList = {
  id: number;
  name: string;
  image: any;
  price: number;
  quantity: number;
  category: string;
  total: number;
};

function getStatus(status: string) {
  switch (status?.toLowerCase()) {
    case "delivered":
      return (
        <span className="rounded-full border border-green-700 bg-green-700 bg-opacity-10 px-3 py-1 text-green-700">
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="rounded-full border border-red-600 bg-red-600 bg-opacity-10 px-3 py-1 text-red-600">
          {status}
        </span>
      );
    case "pending":
      return (
        <span className="rounded-full border border-orange-400 bg-orange-500 bg-opacity-10 px-3 py-1 text-orange-400">
          {status}
        </span>
      );
    default:
      return (
        <span className="rounded-full border border-neutral-800 bg-neutral-800 bg-opacity-10 px-3 py-1 text-neutral-800">
          {status}
        </span>
      );
  }
}

const orderItems = [
  {
    id: 0,
    name: "Chocolate Fudge Cake",
    image: Chocolate,
    price: 508.98,
    quantity: 1,
    category: "Milestone Cakes",
    total: 508.98,
  },
  {
    id: 1,
    name: "Red Velvet Cake",
    image: RedVelvet,
    price: 100.0,
    quantity: 1,
    category: "Milestone Cakes",
    total: 100.0,
  },
];

const columnHelper = createColumnHelper<MyOrderList>();
const columns = [
  columnHelper.accessor((row) => row, {
    id: "product",
    header: () => <span>Product</span>,
    cell: (info) => (
      <div className="grid grid-cols-[70px_1fr] items-center gap-2">
        <Image
          src={info.cell.row.original.image}
          alt={info.cell.row.original.name}
          className="h-[50px] w-full object-cover"
        />
        <span>{info.cell.row.original.name}</span>
      </div>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: "category",
    header: () => <span>Category</span>,
    cell: (info) => <span className="">{info.cell.row.original.category}</span>,
  }),
  columnHelper.accessor("quantity", {
    header: () => <span>Qnty</span>,
    cell: (info) => <div className="">{info.cell.row.original.quantity}</div>,
  }),
  columnHelper.accessor("price", {
    header: () => <span>Amount</span>,
    cell: (info) => (
      <div className="">&euro;{info.cell.row.original.price}</div>
    ),
  }),
  columnHelper.accessor("total", {
    header: () => <span>Shipping</span>,
    cell: (info) => (
      <div className="">&euro;{info.cell.row.original.total}</div>
    ),
  }),
];

const MyOrderDetails = ({ params }: { params: any }) => {
  const { order: id } = params;
  const [order, setOrder] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); 
  // const { data: orderById, isPending, isSuccess, isError, } = useQuery({
  //   queryKey: ["Order By Id"],
  //   // queryFn: getOrderByOrderId,
  // });

  // console.log('orderbyId: ', orderById)

      //   const orderId = orderbyId.order.map((order: any) => ({
      //   date: new Date(order.createdAt).toLocaleDateString(),
      //   id: order._id,
      //   name: order?.placeholder,
      //   price: order?.fee?.total,
      //   quantity: order?.orderedItems?.lengths,
      //   shippingFee: order?.fee?.deliveryFee,
      //   status: order?.orderStatus,
        
      // }))

      
// {name: 'Strawberry Sponge Cake', id: 'B736383836hgdy73', date: '2024-05-06', price: '300.00', status: 'Pending', …}
// date: "2024-05-06"
// id: "B736383836hgdy73"
// name: "Strawberry Sponge Cake"
// price: "300.00"
// quantity: 2
// shippingFee: 5.5
// status: "Pending"
// total: 100

  // useEffect(() => {
  //   const orderDetails = recentOrders.find((order) => order?.id === id);

  //   console.log(orderDetails);

  //   setOrder(orderDetails);
  // }, [params, id]);
 useEffect(() => {
   const fetchOrderDetails = async () => {
     try {
       setIsLoading(true);
       const orderDetails = await getOrderByOrderId(id); // Fetch order details from API
        console.log('orderDetails: ', orderDetails)
       setOrder(orderDetails);
       if (orderDetails.error) {
         setError(orderDetails.message || "Failed to fetch order details.");
       } else {
         setOrder(orderDetails.order); 
       }

     } catch (err) {
       setError("Failed to fetch order details.");
     } finally {
       setIsLoading(false);
     }
   };

   fetchOrderDetails();
 }, [id]);
  
  
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // If there's an error, display the error message
    if (error) {
      return <div>{error}</div>;
  }
    if (!order) {
      return <div>No order details available.</div>;
    }
  return (
    <>
      <div className="mt-[64px]" />
      <section className="bg-neutral-100 py-6">
        <div className="wrapper">
          <div className="py-0">
            <Link
              href={"/my-orders"}
              className="inline-flex items-center gap-2"
            >
              <span className="">
                <ArrowLeft />
              </span>
              <span className="text-lg font-semibold md:text-2xl">
                Order Details
              </span>
            </Link>
          </div>
          <hr className="mb-4 border-0 border-b pb-3 " />

          <div className="space-y-5 lg:hidden">
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center justify-between">
                    {/* <span>Order ID: #GOL{order?.id.slice(0, 4)}</span> */}
                    {order.orderId}

                    <span>
                      <StatusColumn status={order?.orderStatus} />
                      {/* {order?.orderStatus} */}
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Name</span>
                    <span>
                      {order?.firstName} {order?.lastName}
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Email</span>
                    <span>
                      <span>{order?.email}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Contact No</span>
                    <span>
                      <span>{order?.phoneNumber}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Order Date:</span>
                    {/* <span>{order?.date.replace(/-/g, "/")}</span> */}
                    <span>
{new Date(order?.createdAt).toISOString().split('T')[0]}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                <li>
                  <div className="flex flex-col  bg-goldie-50 px-1 py-2">
                    <h3 className="mb-1 font-medium">Billing Address</h3>
                    <p className="text-neutral-600">
                      {order?.streetAddress}, {order?.cityOrTown},
                      {order?.country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col">
                    <h3 className="mb-1 font-medium">Shipping Address</h3>
                    <p className="text-neutral-600">
                      {order?.streetAddress}, {order?.cityOrTown},
                      {order?.country}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-md bg-white p-4">
              <ul className="space-y-3">
                {/* <li>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                      <Image
                        src={Chocolate}
                        alt="chocolate cake"
                        width={100}
                        height={55}
                        className="h-[55px] w-full object-cover"
                      />
                      <div>
                        <h3>Chocolate Fudge Cake</h3>
                        <span>1 Qty</span>
                      </div>
                    </div>
                    <span>€508.98</span>
                  </div>
                </li> */}
                <li>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                      <Image
                        src={RedVelvet}
                        alt="Redvelvet cake"
                        width={100}
                        height={55}
                        className="h-[55px] w-full object-cover"
                      />
                      <div>
                        <h3>Red Velvet Cake</h3>
                        <span>1 Qty</span>
                      </div>
                    </div>
                    <span>€508.98</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Category</span>
                    <span>
                      <span>Milestone Cakes</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Subcategory</span>
                    <span>
                      <span>Birthday Cakes</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between bg-goldie-50 px-1 py-2">
                    <span>Price</span>
                    <span>
                      <span>&euro;{order?.fee?.subTotal}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>
                      <span>&euro;{order?.fee?.deliveryFee}</span>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between border-t bg-goldie-50 px-1 py-2">
                    <span>Total</span>
                    <span>
                      <span>&euro;{order?.fee?.total}</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:mx-auto lg:block xl:max-w-[90%]">
            {/* ORDER DETAILS */}
            <div className="rounded-md bg-white p-5">
              <span className="font-semibold ">
                {/* Order ID : #GOL{order?.id?.slice(0, 4)} */}
                {order.orderId}
              </span>

              <div className="mt-3 flex justify-between">
                <div className="flex flex-col gap-5">
                  <ul>
                    <li className="font-medium">Name</li>
                    <li className="text-neutral-600">
                      {order?.firstName} {order?.lastName}
                    </li>
                  </ul>
                  <ul>
                    <li className="font-medium">Email</li>
                    <li className="text-neutral-600">{order?.email}</li>
                  </ul>
                  <ul>
                    <li className="font-medium">Billing Address</li>
                    <li className="text-neutral-600">
                      {order?.streetAddress}, {order?.cityOrTown},
                      {order?.country}
                    </li>
                  </ul>
                  <ul>
                    <li className="font-medium">Shipping Address</li>
                    <li className="text-neutral-600">
                      {order?.streetAddress}, {order?.cityOrTown},
                      {order?.country}
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-5">
                  <ul>
                    <li className="font-medium">Status</li>
                    <li>{getStatus(order?.orderStatus)}</li>
                    {/* <li>{order?.orderStatus}</li> */}
                  </ul>
                  <ul>
                    <li className="font-medium">Contact No</li>
                    <li className="text-neutral-600">{order?.phoneNumber}</li>
                  </ul>
                  <ul>
                    <li className="font-medium">Order Date</li>
                    {/* <li className="text-neutral-600">{order?.date}</li> */}
                    <li className="text-neutral-600">
{new Date(order?.createdAt).toISOString().split('T')[0]}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS TABLE */}
            <div className="mt-5">
              <ProductTable
                columns={columns}
                Tdata={orderItems}
                filteredTabs={[]}
                showSearchBar={false}
              />

              <div className=" mt-5 flex justify-end">
                <div className="flex w-[300px] flex-col gap-3 bg-white p-4">
                  <div className="inline-flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>€{order.fee.subTotal}</span>
                  </div>
                  <div className="inline-flex items-center justify-between">
                    <span>Tax</span>
                    <span>€{order.fee.deliveryFee}</span>
                  </div>
                  <div className="inline-flex items-center justify-between border-t pt-3">
                    <span>Total</span>
                    <span>€{order.fee.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrderDetails;
