// types/api.ts
export interface User {
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
