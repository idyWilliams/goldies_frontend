import instance from "@/services/api";

// GET A USER
export const getUser = async () => {
  const response = await instance.get("/user/get_user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    },
  });
  return response.data;
};
