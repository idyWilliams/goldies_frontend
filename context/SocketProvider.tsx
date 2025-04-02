// context/SocketProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/lib/socket";

interface ISocketContext {
  socket: typeof socket;
  isConnected: boolean;
  connectionError: string | null;
}

const SocketContext = createContext<ISocketContext>({
  socket,
  isConnected: false,
  connectionError: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    function connectSocket() {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.warn("No token available - skipping socket connection");
        setConnectionError("No authentication token available");
        return;
      }

      console.log("Attempting to connect with token...");

      // Ensure socket is disconnected before reconnecting
      if (socket.connected) {
        socket.disconnect();
      }

      // Set auth and connect
      socket.auth = { token };
      socket.connect();
    }

    const onConnect = () => {
      setIsConnected(true);
      setConnectionError(null);
      console.log("Socket connected with ID:", socket.id);
    };

    const onDisconnect = (reason: string) => {
      setIsConnected(false);
      console.log("Socket disconnected:", reason);

      // Reconnect if disconnected due to transport error
      if (reason === "transport error" || reason === "ping timeout") {
        setTimeout(connectSocket, 5000);
      }
    };

    const onConnectError = (err: Error) => {
      console.error("Connection error:", err.message);
      setConnectionError(err.message);

      // Try reconnecting with a delay
      setTimeout(connectSocket, 5000);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    // Initial connection attempt
    connectSocket();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, connectionError }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
