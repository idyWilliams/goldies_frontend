import instance from "@/services/api";
import {
  CreateUser,
  ForgotPassword,
  LoginUser,
  ResetPassword,
  LoginAdmin,
} from "@/services/types";

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

// SUBMIT EMAIL FOR FORGOT PASSWORD
export const forgotPassword = async (data: ForgotPassword) => {
  const response = await instance.post("/auth/forgot_password", data);

  return response.data;
};
// SUBMIT EMAIL FOR FORGOT PASSWORD
export const resetPassword = async (data: ResetPassword) => {
  localStorage.setItem("accessToken", data.token);

  const response = await instance.post("/auth/reset_password", data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  return response.data;
};








