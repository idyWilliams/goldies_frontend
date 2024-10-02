import instance from "@/services/api";

// GET A USER

const accessToken = localStorage.getItem("accessToken") || "";
const user = JSON.parse(localStorage.getItem("user") || "");

export const getAllCategories = async () => {
  const response = await instance.get(
    `/category/get_all_category`,

    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response.data;
};
export const getCategory = async (categoryId: string) => {
  const response = await instance.get(
    `/category/get_category/${categoryId}`,

    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response.data;
};

export const createCategory = async (data: any) => {
  const response = await instance.post("/user/category", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
