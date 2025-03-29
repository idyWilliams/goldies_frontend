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

// Example usage
export const mergeSampleCart = async () => {
  //   try {
  //     const sampleCartItems: LocalCartItem[] = [
  //       //   {
  //       //     product: "67e55808e93cf65ce68f1c0b", // Replace with actual product ID
  //       //     size: "medium",
  //       //     toppings: ["cheese", "pepperoni"],
  //       //     flavour: ["chocolate"],
  //       //     quantity: 1,
  //       //     // Optional fields
  //       //     // shape: "round",
  //       //     // dateNeeded: "2024-01-01",
  //       //     // details: "Special instructions"
  //       //   },
  //       {
  //         product: "67e55808e93cf65ce68f1c0b",
  //         size: "medium",
  //         toppings: ["cheese", "pepperoni"],
  //         flavour: ["classic"],
  //         shape: "round",
  //         dateNeeded: "2024-03-30",
  //         details: "Extra crispy",
  //         quantity: 2,
  //       },
  //       {
  //         product: "67e55808e93cf65ce68f1c0b",
  //         size: "large",
  //         toppings: ["mushroom", "olives"],
  //         flavour: ["veggie"],
  //         shape: "square",
  //         dateNeeded: "2024-03-31",
  //         details: "No onions",
  //         quantity: 1,
  //       },
  //     ];

  //     const result = await mergeLocalCart(sampleCartItems);
  //     return result;
  //   } catch (error) {
  //     console.error("Failed to merge cart:", error);
  //   }

  try {
    const token = localStorage.getItem("userToken");
    const cartItems = [
      {
        product: "67e55808e93cf65ce68f1c0b",
        size: "medium",
        toppings: ["cheese", "pepperoni"],
        flavour: ["classic"],
        shape: "round",
        dateNeeded: "2024-03-30",
        details: "Extra crispy",
        quantity: 2,
      },
      {
        product: "67e55808e93cf65ce68f1c0b",
        size: "large",
        toppings: ["mushroom", "olives"],
        flavour: ["veggie"],
        shape: "square",
        dateNeeded: "2024-03-31",
        details: "No onions",
        quantity: 1,
      },
    ];

    const result = await mergeLocalCart(cartItems, token);

    console.log(result, "thu");
  } catch (error) {
    // Handle merge error
  }
};
