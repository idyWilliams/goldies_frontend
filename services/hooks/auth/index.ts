import instance from "@/services/api";
import { CreateUser, LoginUser } from "@/services/types";
import { LoginAdmin } from "@/services/types";

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




















// ADMIN LOGIN
export const loginAdmin = async (data: LoginAdmin) => {
  const response = await instance.post("/admin/admin_auth-refCode${}", data);
  return response.data;
};

// OTP 
export const verifyOTP = async (data:string  ) => {
  const response = await instance.post('/admin/verify_otp', data )
  return response.data;
};





