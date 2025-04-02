// components/SocketDebug.tsx
"use client";
import { useSocket } from "@/context/SocketProvider";

export const SocketDebug = () => {
  const { isConnected, connectionError, socket } = useSocket();

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs rounded-lg bg-white p-3 shadow-lg">
      <h3 className="mb-2 font-bold">Socket.IO Connection</h3>
      <div className="mb-1 flex items-center">
        Status:
        <span
          className={`ml-2 h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
        />
        {isConnected ? "Connected" : "Disconnected"}
      </div>
      {connectionError && (
        <div className="mt-1 text-sm text-red-500">
          Error: {connectionError}
        </div>
      )}
      <div className="mt-2 text-xs">
        Socket ID: {socket.id || "Not connected"}
      </div>
      <button
        onClick={() => socket.connect()}
        className="mt-2 rounded bg-blue-500 px-2 py-1 text-xs text-white"
      >
        Reconnect
      </button>
    </div>
  );
};
