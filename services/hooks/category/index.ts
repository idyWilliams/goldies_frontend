import instance from "@/services/api";

// GET A USER
let accessToken = "";
let user: { token?: string } = {};

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken") || "";
  user = JSON.parse(localStorage.getItem("user") || "{}");
}

export const getCategoriesUser = async () => {
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
export const getCategoryUser = async (categoryId: string) => {
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
