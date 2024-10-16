import instance from "@/services/api";
import {
  Category,
  CategoryId,
  EditCategory,
  EditSubCategory,
  SubCategory,
  SubCategoryId,
} from "@/services/types";

// GET A USER
let accessToken = "";
let user: { token?: string } = {};

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken") || "";
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

export const getPaginatedCategories = async (
  pageNum: number,
  limitNum: number,
) => {
  const response = await instance.get(
    `/category/get_all_category?page=${pageNum}&limit=${limitNum}`,
  );
  return response.data;
};
export const getAllCategories = async () => {
  const response = await instance.get(`/category/get_all_category`);
  return response.data;
};

export const getCategory = async (categoryId: string | null) => {
  const response = await instance.get(`/category/get_category/${categoryId}`);
  return response.data;
};

export const createCategory = async (data: Category) => {
  const response = await instance.post("/category/create_category", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const editCategory = async (data: EditCategory) => {
  const category = { ...data };
  const categoryId = data.categoryId;
  delete category.categoryId;
  const response = await instance.put(
    `/category/edit_category/${categoryId}`,
    category,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const deleteCategory = async (categoryId: CategoryId) => {
  const response = await instance.delete(
    `/category/delete_category/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const createSubCategory = async (data: SubCategory) => {
  // console.log(accessToken);

  const response = await instance.post(
    "/subcategory/create_subcategory",
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const getSubCategory = async (categoryId: string | null) => {
  const response = await instance.get(
    `/subcategory/get_subcategory/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const editSubCategory = async (data: EditSubCategory) => {
  const { subCategory, subCategoryId } = data;

  const response = await instance.put(
    `subcategory/edit_subcategory/${subCategoryId}`,
    subCategory,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const deleteSubCategory = async (subCategoryId: SubCategoryId) => {
  const response = await instance.delete(
    `/subcategory/delete_subcategory/${subCategoryId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
