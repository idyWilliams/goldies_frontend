import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Assuming you have an axios instance set up
import instance from "@/services/api";
import axios from "axios";

export const useNotifications = (limit = 10) => {
  return useQuery({
    queryKey: ["notifications", limit],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/notifications/admin?limit=${limit}`,
      );
      return data;
    },
    refetchInterval: 60000, // Refetch every minute as a fallback
  });
};


export const getActiveProduct = async (productId: string) => {
  const response = await instance.get(`/product/get_product/${productId}`);
  return response.data;
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: async () => {
      const { data } = await axios.get("/api/notifications/admin?limit=1");
      return data.unreadCount;
    },
    refetchInterval: 30000, // Refetch count more frequently
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { data } = await axios.post("/api/notifications/mark-read", {
        ids,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (type?: string) => {
      const url = type
        ? `/api/notifications/mark-all-read?type=${type}`
        : "/api/notifications/mark-all-read";
      const { data } = await axios.post(url);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });
    },
  });
};

export const useArchiveNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.patch(`/api/notifications/archive/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
