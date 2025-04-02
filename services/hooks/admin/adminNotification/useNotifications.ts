// src/hooks/useNotifications.ts
import { useEffect, useState } from "react";
// import {
//   getNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from "@/services/notification.api";
// import { INotification } from "@/interfaces/notification.interface";
import { socket } from "@/lib/socket";
import { getNotifications,   markNotificationAsRead,
markAllNotificationsAsRead, } from "../useNotifications";

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

export const useNotifications = (
  adminId: string | undefined,
  role: string,
) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new notification from socket
  const handleNewNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  // Mark single notification as read
  const markAsRead = async (id: string) => {
    try {
      const updatedNotification = await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? updatedNotification : n)),
      );
      setUnreadCount((prev) => (updatedNotification.isRead ? prev - 1 : prev));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all notifications as read", err);
    }
  };

  // Set up socket listeners
  useEffect(() => {
    if (!adminId) return;

    // Join admin's personal room
    socket.emit("join-user-room", adminId);

    // Listen for new notifications
    socket.on("new-notification", handleNewNotification);

    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, [adminId]);

  // Initial fetch
  useEffect(() => {
    if (role) {
      fetchNotifications();
    }
  }, [role]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
};
