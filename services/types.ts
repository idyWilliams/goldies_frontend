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
  admin: Admin;
  token?: string; 
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













export interface LoginAdmin {
  email: string;
  password: string;
}

export interface GetUserResponse {
  user: User;
  message: string;
}







