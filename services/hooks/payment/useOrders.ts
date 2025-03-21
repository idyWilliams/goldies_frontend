import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../admin-auth";
import { IUser, UserParams } from "@/interfaces/user.interface";
import { useMemo } from "react";
import { IOrder, OrderParams } from "@/interfaces/order.interface";
import { adminGetAllOrders } from ".";

const useOrders = (params: OrderParams) => {
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["adminAllOrders", params],
    queryFn: async () => adminGetAllOrders(params),
  });

  const { orders, totalPages, totalOrders } = useMemo(() => {
    if (!data || isLoading || isError) {
      return { users: [], totalPages: 0, totalOrders: 0 };
    }
    return {
      orders: (data.orders as IOrder[]) ?? [],
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

export default useOrders;
