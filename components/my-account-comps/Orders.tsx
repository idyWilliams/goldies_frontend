import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from ShadCN
import { cn } from "@/helper/cn";
import { formatCurrency } from "@/helper/formatCurrency";
import { getOrderColor } from "@/helper/getOrderColor";
import { IOrder } from "@/interfaces/order.interface";
import { getOrdersByUser } from "@/services/hooks/payment";
import { useQuery } from "@tanstack/react-query";
import { Eye, ShoppingCart } from "iconsax-react";
import { ArchiveX } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";

const Orders = () => {
  const router = useRouter();
  const {
    data: ordersResponse,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["ordersByUser"],
    queryFn: getOrdersByUser,
  });

  const processedOrders = useMemo<IOrder[]>(() => {
    if (!ordersResponse?.userOrder) return [];
    return ordersResponse?.userOrder as IOrder[];
  }, [ordersResponse?.userOrder]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-0 border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">Orders</h2>

        <button
          onClick={() => router.push("/my-orders")}
          disabled={processedOrders?.length < 1}
          className="cursor-pointer rounded-md bg-brand-200 px-5 py-2 text-sm text-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          See all
        </button>
      </div>
      {isSuccess && processedOrders?.length > 0 ? (
        <>
          <div>
            <div className="table w-full">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell border-b pb-2 pl-2 text-left">
                    Order ID
                  </div>
                  <div className="table-cell border-b pb-2 text-left">Date</div>
                  <div className="table-cell border-b pb-2 text-left">
                    Amount
                  </div>
                  <div className="table-cell border-b pb-2 text-left">
                    Status
                  </div>
                  <div className="table-cell border-b pb-2 pr-2 text-left"></div>
                </div>
              </div>

              {isPending ? (
                // Skeleton Loading Placeholder
                <div className="table-row-group">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="table-row">
                      <div className="table-cell py-2 pl-2">
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="table-cell py-2">
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="table-cell py-2">
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="table-cell py-2">
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="table-cell py-2 pr-2">
                        <Skeleton className="h-4 w-6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                processedOrders.slice(0, 10).map((order, index) => (
                  <div className="table-row-group" key={index}>
                    <div
                      className={cn(
                        "table-row",
                        (index + 1) % 2 === 0 && "bg-goldie-300 bg-opacity-20",
                      )}
                    >
                      <div className="table-cell py-2 pl-2 align-middle">
                        <span className="text-sm font-semibold uppercase leading-none text-neutral-600">
                          <Link href={`/my-orders/${order._id}`}>
                            {order?.orderId}
                          </Link>
                        </span>
                      </div>
                      <div className="table-cell py-2 align-middle">
                        <span className="text-sm">
                          {moment(order?.createdAt).format(
                            "MMM DD, YYYY HH:mm A",
                          )}
                        </span>
                      </div>
                      <div className="table-cell py-2 align-middle">
                        <span className="text-sm">
                          {formatCurrency(order?.fee?.total, "en-NG")}
                        </span>
                      </div>
                      <div className="table-cell py-2 align-middle">
                        <span
                          className={cn(
                            "text-sm",
                            getOrderColor(order?.orderStatus),
                          )}
                        >
                          {order?.orderStatus}
                        </span>
                      </div>
                      <div className="table-cell py-2 pr-2 align-middle">
                        <Link href={`/my-orders/${order._id}`}>
                          <Eye />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-200 text-brand-100">
              <ArchiveX size={35} />
            </span>
            <div className="text-center text-lg font-semibold">
              You don&apos;t have any active order
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
