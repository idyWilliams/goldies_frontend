import axios from "axios";

interface LocalCartItem {
  product: string;
  size: string;
  toppings: string[];
  flavour: string[];
  quantity: number;
  shape?: string;
  dateNeeded?: string;
  details?: string;
}

export const mergeLocalCart = async (
  localCartItems: LocalCartItem[],
  token: string | null,
) => {
  try {
    console.log("Merging local cart items:", localCartItems);
    console.log("token:", token);

    const response = await axios.put(
      "https://goldies-backendv2.onrender.com/api/cart/merge_local_cart",
      { localCartItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Merge cart success:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Merge cart error:", {
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   message: error.message,
    //   fullError: error,
    // });
    throw error;
  }
};

