"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/lib/socket";

interface ISocketContext {
  socket: typeof socket;
  isConnected: boolean;
  transport: string;
}

const SocketContext = createContext<ISocketContext>({
  socket,
  isConnected: false,
  transport: "N/A",
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      console.log("Socket connected via", socket.io.engine.transport.name);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
      console.log("Socket disconnected");
    };

    const onConnectError = (err: Error) => {
      console.error("Connection error:", err);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);

    console.log("Attempting to connect socket...");
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      console.log("Cleaning up socket...");
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, transport }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
