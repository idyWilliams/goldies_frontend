import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket } from "../lib/socket";
import { useQueryClient } from "@tanstack/react-query";
// import { useAuthStore } from "../stores/authStore";
import { useAuth } from "./AuthProvider";

type NotificationContextType = {
  socket: Socket | null;
};

const NotificationContext = createContext<NotificationContextType>({ socket: null });

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const { auth } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();
//   const isAuthenticated = useAuthStore(state => state.isAuthenticated);
//   const user = useAuthStore(state => state.user);

  useEffect(() => {
    let socketInstance: Socket | null = null;

    if (
      auth &&
      auth?.admin?.role &&
      ["admin", "super_admin"].includes(auth?.admin?.role)
    ) {
      socketInstance = initializeSocket();
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Socket connected");
      });

      socketInstance.on("new-notification", (notification) => {
        // Play notification sound
        const audio = new Audio("/notification-sound.mp3");
        audio
          .play()
          .catch((err) =>
            console.error("Error playing notification sound:", err),
          );

        // Update React Query cache with the new notification
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        queryClient.invalidateQueries({ queryKey: ["unreadNotifications"] });

        // Show browser notification if permission is granted
        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/notification-icon.png",
          });
        }
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [auth?.admin?.role, queryClient]);

  return (
    <NotificationContext.Provider value={{ socket }}>
      {children}
    </NotificationContext.Provider>
  );
};