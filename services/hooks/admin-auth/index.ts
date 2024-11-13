import instance from "@/services/api";
import {
  CreateAdmin,
  LoginAdmin,
  InviteAdmin,
  VerificationOtp,
  Users,
} from "@/services/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// INVITE ADMIN
export const inviteAdmin = async (data: InviteAdmin) => {
  const response = await instance.post("/admin/invite", data);
  return response.data;
};

// CREATE AN ADMIN
export const createAdmin = async (data: CreateAdmin) => {
  const response = await instance.post(
    `/admin/signup?refCode=${data.refCode}`,
    { email: data.email, password: data.password, userName:data?.userName },
  );
  return response.data;
};

// ADMIN LOGIN
export const loginAdmin = async (data: LoginAdmin) => {
  const response = await instance.post("/admin/login", data);
  return response.data;
};

// OTP
export const verifyOTP = async (data: VerificationOtp) => {
  const response = await instance.post("/admin/verify", data);
  return response.data;
};

// GET USER
export const getUsers = async () => {
  const response = await instance.get("/user/get_all_users");
  return response.data;
};

export const adminLogOut = async (router: AppRouterInstance) => {
  localStorage.setItem("isLogin", JSON.stringify(false));
  localStorage.removeItem("accessToken");
  localStorage.removeItem("admin");
  router.push("/admin-sign-in");
};
