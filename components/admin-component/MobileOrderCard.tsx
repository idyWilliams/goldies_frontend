import React, { useState } from "react";
import Card from "../Card";
import { orderList } from "@/utils/adminData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IOrder } from "@/interfaces/order.interface";

type Product = {
  id: string;
  image: any;
  productName: string;
  orderDate: string;
  billingName: string;
  priceFrom: number;
  totalPrice: number;
  status: string;
};

const statusColor = (status: string) => {
  switch (status) {
    case "success":
      return (
        <div className="text-sm font-semibold text-green-700">Success</div>
      );
    case "failed":
      return <div className="text-sm font-semibold text-red-700">Failed</div>;
    case "pending":
      return (
        <div className="text-sm font-semibold text-orange-600">Pending</div>
      );
    default:
      return;
  }
};

export default function MobileOrderCard({ data }: { data: IOrder[] }) {
  const [selectedTabs, setSelectedTabs] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  const router = useRouter();
  const handleTabClick = (status: string) => {
    setSelectedTabs(status);
    if (status === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (item) => item?.orderStatus.toLowerCase() === status.toLowerCase(),
        ),
      );
    }
  };
  return (
    <div className="">
      <div className="mt-3 flex items-center gap-1">
        {["All", "Pending", "Success", "Failed"].map(
          (tabs: string, index: number) => (
            <button
              key={index}
              className={`w-fit rounded-sm border px-2 ${selectedTabs === tabs ? "bg-black text-goldie-300" : "border-neutral-200 bg-white"}`}
              onClick={() => {
                handleTabClick(tabs);
              }}
            >
              {tabs}
            </button>
          ),
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4">
        {filteredData.map((data: IOrder, index: number) => {
          return (
            <Card key={index} className="bg-white p-4 shadow-xl">
              <div>
                <div>
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    
                    <div className="grid grid-cols-[1fr_0.5fr]">
                      <div className="flex flex-col items-start">
                        <span className="inline-block text-sm font-semibold">
                          {data.orderId}
                        </span>
                        <span className="mb-1.5 mt-1 inline-block text-sm font-medium">
                          &euro;{data.fee.total}
                        </span>
                      </div>
                      <div className=" text-right ">
                        <span className="text-xs">{data.createdAt}</span>
                        <span className="text-sm">
                          {statusColor(data.orderStatus)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    className="h-[29px] w-[97px] rounded-sm bg-goldie-300 text-xs text-black"
                    onClick={() => router.push(`/admin/orders/${data._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
