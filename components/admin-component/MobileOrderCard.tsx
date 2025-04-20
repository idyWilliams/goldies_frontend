import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder } from "@/interfaces/order.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "../Card";
import moment from "moment";
import { Button } from "../ui/button";

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <div className="text-sm font-semibold text-green-700">Completed</div>
      );
    case "cancelled":
      return (
        <div className="text-sm font-semibold text-red-700">Cancelled</div>
      );
    case "pending":
      return (
        <div className="text-sm font-semibold text-orange-600">Pending</div>
      );
    default:
      return;
  }
};

export default function MobileOrderCard({ data }: { data: IOrder[] }) {
  const router = useRouter();

  return (
    <div className=" grid grid-cols-1 gap-4">
      {data.map((data: IOrder, index: number) => {
        return (
          <Card key={index} className="bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col items-start">
                    <span className="inline-block text-sm font-semibold">
                      Order ID: {data.orderId}
                    </span>
                    <span className="mb-1.5 mt-1 inline-block text-sm font-medium">
                      <span className="font-semibold">Total:</span>{" "}
                      {formatCurrency(data.fee.total, "en-NG")}
                    </span>
                  </div>

                  {/* timestamp */}
                  <div className="flex flex-col text-right ">
                    <span className="text-sm">
                      {moment(data.createdAt).format("MMM DD, YYYY HH:mm A")}
                    </span>
                    <span className="text-sm">
                      {statusColor(data.orderStatus)}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 inline-block text-sm font-medium">
                    <span className="font-semibold">Billing Name:</span>{" "}
                    {data?.firstName + " " + data.lastName}
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="rounded-sm bg-goldie-300 text-black hover:bg-goldie-400"
                  onClick={() => router.push(`/admin/orders/${data._id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
