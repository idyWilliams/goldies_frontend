import instance from "@/services/api";

// GET A USER
export const createCategory = async (data: any) => {
  const response = await instance.post("/user/category", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    },
  });
  return response.data;
};

// GET CATEGORY
export const getCategory = async (data: any) => {
  const response = await instance.post("/category/get_category/:categoryId", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    },
  });
  return response.data;
};



// GET ALL CATEGORIES
export const fetchCategories = async (data: any) => {
  const response = await instance.get("/category/get_all_category");
  return response.data; 
};

// GET ALL SUBCATEGORIES
export const fetchSubCategories = async (data: any) => {
  const response = await instance.get("/subcategory/get_all_subcategory");
  return response.data;
};





