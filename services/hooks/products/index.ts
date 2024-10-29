import instance from "@/services/api";

// CREATE PRODUCT
export const createProduct = async (data: any) => {
  const response = await instance.post("/product/create_product", data);
  return response.data;
};

// GET ALL PRODUCTS
export const getProducts = async (data: any) => {
  const response = await instance.get("/product/get_all_products", data);
  return response.data;
};

export const fetchProducts = async (category: string, subcategory?: string) => {
    const response = await instance.get(`/product/get_all_product?category=${category}&subcategory=${subcategory}`);
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
