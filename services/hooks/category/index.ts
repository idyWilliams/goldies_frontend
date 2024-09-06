import instance from "@/services/api";
import { Category, CategoryId } from "@/services/types";

// GET A USER

export const createCategory = async (data: Category) => {
  const response = await instance.post("/category/create_category", data, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    // },
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGIxOTE4YjIxYWY3NjMxNWNhODU1MCIsImlhdCI6MTcyNTY0MjcxMSwiZXhwIjoxNzI1NzI5MTExfQ.7aKMMqv3F6vXOkWffLnniD4KGF5KIoTkSZgV98i7kN0" as string}`,
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
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGIxOTE4YjIxYWY3NjMxNWNhODU1MCIsImlhdCI6MTcyNTY0MjcxMSwiZXhwIjoxNzI1NzI5MTExfQ.7aKMMqv3F6vXOkWffLnniD4KGF5KIoTkSZgV98i7kN0" as string}`,
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
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGIxOTE4YjIxYWY3NjMxNWNhODU1MCIsImlhdCI6MTcyNTY0MjcxMSwiZXhwIjoxNzI1NzI5MTExfQ.7aKMMqv3F6vXOkWffLnniD4KGF5KIoTkSZgV98i7kN0" as string}`,
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
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGIxOTE4YjIxYWY3NjMxNWNhODU1MCIsImlhdCI6MTcyNTY0MjcxMSwiZXhwIjoxNzI1NzI5MTExfQ.7aKMMqv3F6vXOkWffLnniD4KGF5KIoTkSZgV98i7kN0" as string}`,
      },
    },
  );
  return response.data;
};
