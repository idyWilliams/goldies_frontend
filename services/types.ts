// types/api.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword?: string;
  version: number;
}
export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword?: string;
  version: number;
}

export interface AuthResponse {
  error: boolean;
  message: string;
  user: User;
  token?: string; // Add token for login response
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface GetUserResponse {
  user: User;
  message: string;
}

export interface ForgotPassword {
  email: string;
}
export interface ResetPassword {
  password: string;
  token: string;
}

// Interfaces for the admin signup and invite admin
export interface CreateAdmin {
  email: string;
  refCode: string;
  password: string;
}

export interface LoginAdmin {
  email: string;
  password: string;
}

export interface VerificationOtp {
  email: string;
  otp: string;
}

export interface InviteAdmin {
  email: string;
}
export interface GetUserResponse {
  user: User;
  message: string;
}
