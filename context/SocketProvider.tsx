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
    const onConnect = () => {
      setIsConnected(true);
      setConnectionError(null);
      console.log("Socket connected with ID:", socket.id);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    };

    const onConnectError = (err: Error) => {
      console.error("Connection error:", err);
      setConnectionError(err.message);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    // Only connect if we have a token
    const token = localStorage.getItem("adminToken");
    if (token) {
      console.log("Attempting to connect with token...");
      socket.auth = { token };
      socket.connect();
    } else {
      console.warn("No token available - skipping socket connection");
      setConnectionError("No authentication token available");
    }

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
