import { chunkArray } from "@/helper/chunkArray";
import { cn } from "@/helper/cn";
import { getOrderColor } from "@/helper/getOrderColor";
import { More } from "iconsax-react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export const recentOrders = [
  {
    name: "Strawberry Sponge Cake",
    id: "B736383836hgdy73",
    date: "2024-05-06",
    price: "300.00",
    status: "Pending", // Options: Pending, Failed, Completed
  },
  {
    name: "Chocolate Fudge Cake",
    id: "C839383938dj38",
    date: "2024-05-07",
    price: "250.00",
    status: "Completed",
  },
  {
    name: "Vanilla Cream Cake",
    id: "V939383838dk39",
    date: "2024-05-08",
    price: "200.00",
    status: "Failed",
  },
  {
    name: "Red Velvet Cake",
    id: "R828383828fj29",
    date: "2024-05-09",
    price: "320.00",
    status: "Pending",
  },
  {
    name: "Lemon Drizzle Cake",
    id: "L737383727gj40",
    date: "2024-05-10",
    price: "180.00",
    status: "Completed",
  },
  {
    name: "Carrot Cake",
    id: "K929383728fh50",
    date: "2024-05-11",
    price: "270.00",
    status: "Pending",
  },
  {
    name: "Cheesecake",
    id: "C826363638gh60",
    date: "2024-05-12",
    price: "230.00",
    status: "Completed",
  },
  {
    name: "Black Forest Cake",
    id: "B737363737hi70",
    date: "2024-05-13",
    price: "340.00",
    status: "Failed",
  },
  {
    name: "Pineapple Upside Down Cake",
    id: "P826373738ij80",
    date: "2024-05-14",
    price: "290.00",
    status: "Pending",
  },
  {
    name: "Tiramisu",
    id: "T738383939kj90",
    date: "2024-05-15",
    price: "310.00",
    status: "Completed",
  },
];

const Orders = () => {
  const [orders] = useState(recentOrders);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-0 border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        {/* <p>Recent orders from the store.</p> */}
        <button className="rounded-md bg-black px-5 py-2 text-sm text-goldie-300">
          See all
        </button>
      </div>

      <div>
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell border-b pb-2 pl-2 text-left">
                Product
              </div>
              <div className="table-cell border-b pb-2 text-left">Date</div>
              <div className="table-cell border-b pb-2 text-left">Amount</div>
              <div className="table-cell border-b pb-2 text-left">Status</div>
              <div className="table-cell border-b pb-2 pr-2 text-left"></div>
            </div>
          </div>
          {chunkArray(orders, 8)[currentPageIndex - 1]?.map(
            (order: any, index: any) => {
              return (
                <div className="table-row-group" key={index}>
                  <div
                    className={cn(
                      "table-row",
                      (index + 1) % 2 === 0 && "bg-goldie-300 bg-opacity-20",
                    )}
                  >
                    <div className="table-cell py-2 pl-2 align-middle">
                      <div>
                        <h3 className="text-sm font-medium">{order?.name}</h3>
                        <span className="text-xs uppercase leading-none text-neutral-600">
                          {order?.id}
                        </span>
                      </div>
                    </div>
                    <div className="table-cell py-2 align-middle">
                      <span className="text-sm">{order?.date}</span>
                    </div>
                    <div className="table-cell py-2 align-middle">
                      <span className="text-sm">&euro;{order?.price}</span>
                    </div>
                    <div className="table-cell py-2 align-middle">
                      <span
                        className={cn("text-sm", getOrderColor(order?.status))}
                      >
                        {order?.status}
                      </span>
                    </div>
                    <div className="table-cell py-2 pr-2 align-middle">
                      <span className="cursor-pointer">
                        <BsThreeDots />
                      </span>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
