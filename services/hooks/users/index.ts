import instance from "@/services/api";
import { GetUserResponse } from "@/services/types";

// GET A USER
export const getUser = async (): Promise<GetUserResponse> => {
  const response = await instance.get("/user/get_user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
    },
  });
  return response.data;
};
