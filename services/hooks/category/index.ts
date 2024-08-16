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
