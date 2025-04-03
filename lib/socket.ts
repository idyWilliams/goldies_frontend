import { BASEURL } from "@/services/api";
import { io } from "socket.io-client";

export const getSocketUrl = () => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL;

  const baseUrl = apiUrl?.replace(/\/api$/, "");

  console.log("Socket connecting to:", baseUrl);
  return baseUrl;
};
console.log("Socket connecting to:", BASEURL);

export const socket = io(getSocketUrl()!, {
  path: "/socket.io",
  transports: ["websocket", "polling"],
  autoConnect: false,
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000, 
  auth: (cb) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    console.log("Auth token available:", !!token);
    cb({ token });
  },
});

// Enhanced debugging for connection issues
if (typeof window !== "undefined") {
  socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected from server:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
    console.error("Error details:", err);
  });

  // Reconnect when token changes
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "adminToken") {
      if (e.newValue) {
        console.log("Token changed, reconnecting...");
        socket.auth = { token: e.newValue };
        socket.connect();
      } else {
        console.log("Token removed, disconnecting...");
        socket.disconnect();
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);
}
