import instance from "@/services/api";
import { GetUserResponse } from "@/services/types";

let accessToken = "";

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken") || "";
}

// GET A USER
export const getUser = async (): Promise<GetUserResponse> => {
  const response = await instance.get("/user/get_user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
