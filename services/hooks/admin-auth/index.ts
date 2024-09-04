import instance from "@/services/api";
import {
  CreateAdmin,
  LoginAdmin,
  InviteAdmin,
  VerificationOtp,
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
// VERIFICATION OTP
export const verificationOtp = async (data: VerificationOtp) => {
  const response = await instance.post("/admin/verify_otp", data);
  return response.data;
};

// ADMIN LOGIN
export const loginAdmin = async (data: LoginAdmin) => {
  const response = await instance.post("/auth/login", data);
  return response.data;
};
