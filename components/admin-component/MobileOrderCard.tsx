import { formatCurrency } from "@/helper/formatCurrency";
import { IOrder } from "@/interfaces/order.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "../Card";
import moment from "moment";
import { Button } from "../ui/button";

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
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col items-start">
                    <span className="inline-block text-sm font-semibold">
                      Order ID: {data.orderId}
                    </span>
                    <span className="mb-1.5 mt-1 inline-block text-sm font-medium">
                      <span className="font-semibold">Total:</span>{" "}
                      {formatCurrency(data.fee.total, "en-NG")}
                    </span>
                    <span className="mb-1.5 mt-1 inline-block text-sm font-medium">
                      <span className="font-semibold">Billing Name:</span>{" "}
                      {data?.firstName + " " + data.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col text-right ">
                    <span className="text-sm">
                      {moment(data.createdAt).format("MMM DD, YYYY HH:mm A")}
                    </span>
                    <span className="text-sm">
                      {statusColor(data.orderStatus)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="rounded-sm bg-goldie-300 hover:bg-goldie-400 text-black"
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
    </div>
  );
}
