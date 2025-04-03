import { IOrder, OrderParams } from "@/interfaces/order.interface";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getOrdersByUser } from ".";

const useSpecificUserOrders = (params: OrderParams) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ordersByUser", params],
    queryFn: async () => getOrdersByUser(params),
  });

  const { orders, totalPages, totalOrders } = useMemo(() => {
    if (!data || isLoading || isError) {
      return { users: [], totalPages: 0, totalOrders: 0 };
    }
    return {
      orders: (data.userOrders as IOrder[]) ?? [],
      totalPages: data.totalPages ?? 0,
      totalOrders: data.totalOrders ?? 0,
    };
  }, [data, isLoading, isError]);

  return {
    orders,
    totalPages,
    totalOrders,
    isLoading,
    isError,
    refetch,
  };
};

export default useSpecificUserOrders;
