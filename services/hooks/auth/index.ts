import instance from "@/services/api";
import { CreateUser, LoginUser } from "@/services/types";

// CREATE A USER
export const createUser = async (data: CreateUser) => {
  const response = await instance.post("/auth/create_acct", data);
  return response.data;
};

// USER LOGIN
export const loginUser = async (data: LoginUser) => {
  const response = await instance.post("/auth/login", data);
  return response.data;
};
