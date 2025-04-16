import {
  addToCartDTO,
  ICart,
  IMergeCart,
  UpdateItemDTO,
} from "@/interfaces/cart.interface";
import instance from "@/services/api";

let accessToken = "";

if (typeof window !== "undefined") {
  // Check if the current URL includes '/admin'
  const isAdmin =
    window.location.pathname.startsWith("/admin/") ||
    window.location.pathname === "/admin";

  // Retrieve token based on the user role
  accessToken = isAdmin
    ? localStorage.getItem("adminToken") || ""
    : localStorage.getItem("userToken") || "";
}



// get cart
export const getCustomersAnalytics = async () => {
  const response = await instance.get("/analytics/summary", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};



