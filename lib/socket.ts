import { io } from "socket.io-client";

import { BASEURL } from "@/services/api";

export const initializeSocket = () => {
 const isAdmin =
   window.location.pathname.startsWith("/admin/") ||
   window.location.pathname === "/admin";

 // Retrieve token dynamically
 const accessToken = isAdmin
   ? localStorage.getItem("adminToken") || ""
   : localStorage.getItem("userToken") || "";

  const socket = io(BASEURL, {
    auth: {
      accessToken,
    },
  });

  return socket;
};
