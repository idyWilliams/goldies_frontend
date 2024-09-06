import instance from "@/services/api";
import { Category, CategoryId } from "@/services/types";

// GET A USER
export const createCategory = async (data: Category) => {
  const response = await instance.post("/category/create_category", data, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    // },
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDMzMGExMWQzOTdhYmVjMjA4NGMwOCIsImlhdCI6MTcyNTUzNzU3NSwiZXhwIjoxNzI1NTQ0Nzc1fQ._4tqdE_YQ5RPYmFh-uctm-Wt7zGqbW55-aqo4Lm_RvI" as string}`,
    },
  });
  return response.data;
};
export const getCategory = async (categoryId: CategoryId) => {
  const response = await instance.get(`/category/get_category/:${categoryId}`, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    // },
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDMzMGExMWQzOTdhYmVjMjA4NGMwOCIsImlhdCI6MTcyNTUzNzU3NSwiZXhwIjoxNzI1NTQ0Nzc1fQ._4tqdE_YQ5RPYmFh-uctm-Wt7zGqbW55-aqo4Lm_RvI" as string}`,
    },
  });
  return response.data;
};
export const getAllCategories = async () => {
  const response = await instance.get(`/category/get_all_category`, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    // },
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDMzMGExMWQzOTdhYmVjMjA4NGMwOCIsImlhdCI6MTcyNTUzNzU3NSwiZXhwIjoxNzI1NTQ0Nzc1fQ._4tqdE_YQ5RPYmFh-uctm-Wt7zGqbW55-aqo4Lm_RvI" as string}`,
    },
  });
  return response.data;
};

export const createSubCategory = async (data: Category) => {
  const response = await instance.post(
    "/subcategory/create_subcategory",
    data,
    {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
      // },
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDMzMGExMWQzOTdhYmVjMjA4NGMwOCIsImlhdCI6MTcyNTUzNzU3NSwiZXhwIjoxNzI1NTQ0Nzc1fQ._4tqdE_YQ5RPYmFh-uctm-Wt7zGqbW55-aqo4Lm_RvI" as string}`,
      },
    },
  );
  return response.data;
};
