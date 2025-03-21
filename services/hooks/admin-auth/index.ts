import instance from "@/services/api";
import {
  CreateAdmin,
  LoginAdmin,
  InviteAdmin,
  VerificationOtp,
  Users,
} from "@/services/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from "js-cookie";
import { ADMIN_TOKEN_NAME } from "@/utils/constants";

// INVITE ADMIN
export const inviteAdmin = async (data: InviteAdmin) => {
  const response = await instance.post("/admin/invite", data);
  return response.data;
};

// CREATE AN ADMIN
export const createAdmin = async (data: CreateAdmin) => {
  const response = await instance.post(
    `/admin/signup?refCode=${data.refCode}`,
    { email: data.email, password: data.password, userName: data?.userName },
  );
  return response.data;
};

// ADMIN LOGIN
export const loginAdmin = async (data: LoginAdmin) => {
  const response = await instance.post("/admin/login", data);
  return response.data;
};

// GET Admin
export const getAdminUsers: () => Promise<{
  error: boolean;
  admins: any[];
  pagination: any;
}> = async () => {
  const response = await instance.get("/admin/admins");
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

// GET single USER
export const getUserById = async (id: string) => {
  const response = await instance.get("/user/" + id);
  return response.data;
};

// GET user orders
export const getUserOrdersById = async (id: string) => {
  const response = await instance.get("/admin/orders/" + id);
  return response.data;
};

// ADMIN PROFILE UPDATE
export const updateAdminProfile = async (data: {
  userName: string;
  id: string;
}) => {
  const { id, userName } = data;
  const response = await instance.put(`/admin/profile/${id}`, { userName });
  return response.data;
};

// ADMIN CHANGE PASSWORD
export const changeAdminPassword = async (data: {
  currentPassword: string;
  newPassword: string;
  id: string;
}) => {
  const { id, currentPassword, newPassword } = data;
  const response = await instance.put(`/admin/profile/${id}`, {
    currentPassword,
    newPassword,
  });
  return response.data;
};

// ADMIN FORGET PASSWORD
export const forgetAdminPassword = async (data: { email: string }) => {
  const response = await instance.post("/admin/forgot-password", data);
  return response.data;
};

// ADMIN RESET PASSWORD
export const resetAdminPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  const response = await instance.post("/admin/reset-password", data);
  return response.data;
};

// GET ADMIN INFO
export const getAdmin = async (id: string) => {
  const response = await instance.get(`/admin/${id}`);
  return response.data;
};

//Administrative actions

export const adminVerify = async (id: string) => {
  const response = await instance.put(`/admins/verify-access/${id}`);
  return response.data;
};
export const deleteAdmin = async (id: string) => {
  const response = await instance.delete(`/admins/${id}`);
  return response.data;
};
export const blockAdmin = async (id: string) => {
  const response = await instance.put(`/admins/revoke-access/${id}`);
  return response.data;
};
export const unBlockAdmin = async (id: string) => {
  const response = await instance.put(`/admins/unblock-access/${id}`);
  return response.data;
};

// LOGOUT ADMIN
export const adminLogOut = async (router: AppRouterInstance) => {
  localStorage.setItem("isLogin", JSON.stringify(false));
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
  Cookies.remove(ADMIN_TOKEN_NAME);

  router.replace("/admin-signin");
};
