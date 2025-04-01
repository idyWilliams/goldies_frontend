// components/SocketStatus.tsx
"use client";
import { useSocket } from "@/context/SocketProvider";

export const SocketStatus = () => {
  const { isConnected, transport } = useSocket();

  return (
    <div className="fixed bottom-4 right-4 rounded-md bg-white p-3 text-sm shadow-md">
      <div className="flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span>{isConnected ? `Connected (${transport})` : "Disconnected"}</span>
      </div>
    </div>
  );
};
