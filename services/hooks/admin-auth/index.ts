import instance from "@/services/api";
import {
  CreateAdmin,
  LoginAdmin,
  InviteAdmin,
  VerificationOtp,
  Users,
} from "@/services/types";

// INVITE ADMIN
export const inviteAdmin = async (data: InviteAdmin) => {
  const response = await instance.post("/admin/invite_admin", data);
  return response.data;
};

// CREATE AN ADMIN
export const createAdmin = async (data: CreateAdmin) => {
  const response = await instance.post(
    `/admin/admin_auth?refCode=${data.refCode}`,
    { email: data.email, password: data.password },
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
  const response = await instance.post("/admin/verify_otp", data);
  return response.data;
};

// GET USER
export const getUsers = async () => {
  const response = await instance.get("/user/get_all_users");
  return response.data;
};
