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
export const getAllProducts = async (page: number, limit: number) => {
  const response = await instance.get(
    `/product/get_all_product?page=${page}&limit=${limit}`,
  );
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
  const response = await instance.delete(`/product/delete_product/${productId}`);
  return response.data;
};

export const addFavorites = async (productId: string) => {
  const product = {
    productId: productId,
  };
  const token = accessToken;

  const response = await instance.post("/favorites/add", product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
