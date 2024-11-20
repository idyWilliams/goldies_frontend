import instance from "@/services/api";

let accessToken = "";
let user: { token?: string } = {};

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken") || "";
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

// CREATE PRODUCT
export const createNewProduct = async (data: any) => {
  console.log(accessToken);

  const response = await instance.post("/product/create_product", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// GET ALL PRODUCTS
export const getProducts = async (data: any) => {
  const response = await instance.get("/product/get_all_products", data);
  return response.data;
};
export const getAllProducts = async () => {
  const response = await instance.get("/product/get_all_product");
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
  const response = await instance.delete(`/product/edit_product/${productId}`);
  return response.data;
};
