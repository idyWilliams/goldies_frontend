// src/services/notification.api.ts
import instance from "@/services/api";

export interface INotification {
  _id: string;
  title: string;
  message: string;
  type: "order" | "user" | "product" | "system" | "payment" | "critical";
  relatedId?: string;
  isRead: boolean;
  visibility: "admin" | "super_admin" | "all";
  createdAt: string;
  updatedAt: string;
}

let accessToken = "";

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("adminToken") || "";
}

// Get all notifications for current admin
export const getNotifications = async (): Promise<INotification[]> => {
  const response = await instance.get("/notifications", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (
  id: string,
): Promise<INotification> => {
  const response = await instance.patch(
    `/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
  await instance.patch(
    "/notifications/read-all",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

// Create admin alert (super_admin only)
export const createAdminAlert = async (data: {
  title: string;
  message: string;
  recipientId?: string;
}): Promise<INotification> => {
  const response = await instance.post("/notifications/admin-alert", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
