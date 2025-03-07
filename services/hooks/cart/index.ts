import { addToCartDTO, ICart, UpdateItemDTO } from "@/interfaces/cart.interface";
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

// add to cart
export const addToCart = async (data: addToCartDTO) => {
  const response = await instance.post("/cart/add", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// update cart
export const updateCartItem = async (data: UpdateItemDTO) => {
  const response = await instance.patch("/cart/update-cart", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

// remove from cart
export const removeFromCart = async (id: string) => {
  const response = await instance.delete(`/cart/remove/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// get cart
export const getCartList = async () => {
  const response = await instance.get("/cart", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

// clear cart.
export const clearCart = async () => {
  const response = await instance.delete(`/cart/clear`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
