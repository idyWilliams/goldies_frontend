import { ProductParams } from "@/interfaces/product.interface";
import {
  CreateReviewDTO,
  UpdateReviewDTO,
} from "@/interfaces/review.interface";
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

// CREATE PRODUCT
export const createNewProduct = async (data: any) => {
  const response = await instance.post("/product/create_product", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await instance.get("/product/get_all_product");
  return response.data;
};

export const getAllProducts = async (params?: ProductParams) => {
  const response = await instance.get("/product/get_all_product", { params });
  return response.data;
};

export const fetchProducts = async (category: string, subcategory?: string) => {
  const response = await instance.get(
    `/product/get_all_product?category=${category}&subcategory=${subcategory}`,
  );
  return response.data;
};

// GET A PRODUCT
export const getProduct = async (productId: string) => {
  const response = await instance.get(`/product/get_product/${productId}`);
  return response.data;
};

// GET A PRODUCT by the slug
export const getProductBySlug = async (slug: string) => {
  const response = await instance.get(`/product/slug/${slug}`);
  return response.data;
};

export const getActiveProduct = async (productId: string) => {
  const response = await instance.get(`/product/get_product/${productId}`);
  return response.data;
};

// UPDATE PRODUCT
export const updateProduct = async (data: any, productId: string) => {
  const response = await instance.put(
    `/product/edit_product/${productId}`,
    data,
  );
  return response.data;
};

// DELETE PRODUCT
export const deleteProduct = async (productId: string) => {
  const response = await instance.delete(
    `/product/delete_product/${productId}`,
  );
  return response.data;
};

export const addFavorites = async (productId: string) => {
  const product = {
    productId: productId,
  };
  // const token = accessToken;

  const response = await instance.post("/favorites/add", product);

  return response.data;
};

export const removeFavorites = async (productId: string) => {
  const product = {
    productId: productId,
  };
  const response = await instance.delete(`/favorites/remove/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // const response = await instance.delete("/favorites/remove", product,);
  return response.data;
};

export const getSavedItems = async () => {
  const response = await instance.get("/favorites/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// for product reviews

// create product review

export const createProductReview = async (data: CreateReviewDTO) => {
  const response = await instance.post("/reviews", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// get all product reviews
export const getAllProductReviews = async (productId: string) => {
  const response = await instance.get(`/reviews/product/${productId}`);
  return response.data;
};

// get reviews by user

export const getUserProductReviews = async () => {
  const response = await instance.get(`/reviews/user/`);
  return response.data;
};

// update review
export const updateProductReview = async (
  data: UpdateReviewDTO,
  reviewId: string,
) => {
  const response = await instance.patch(`/reviews/${reviewId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// delete review
export const deleteProductReview = async (reviewId: string) => {
  const response = await instance.delete(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};