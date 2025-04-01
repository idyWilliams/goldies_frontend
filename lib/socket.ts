
import { BASEURL } from "@/services/api";
import { io } from "socket.io-client";

// const SOCKET_URL =
//   process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:2030";

export const socket = io(BASEURL, {
  autoConnect: false,
  withCredentials: true,
  auth: (cb) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    cb({ token });
  },
});

// Reconnect logic
if (typeof window !== "undefined") {
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  socket.on("connect_error", (err) => {
    console.log("Connection error:", err.message);
  });

  // Reconnect when token changes
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "adminToken") {
      if (e.newValue) {
        socket.auth = { token: e.newValue };
        socket.connect();
      } else {
        socket.disconnect();
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);
}
