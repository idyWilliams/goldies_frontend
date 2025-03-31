import { IProduct } from "./product.interface";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  favorites: IProduct[];
  billingInfo: IBillingInfo[];
  createdAt: string;
  updatedAt: string;
  hashedPassword?: string;
}

export interface IBillingInfo {
  _id: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  cityOrTown: string;
  state: string;
  country: string;
  phoneNumber: string;
  email: string;
  defaultBillingInfo: boolean;
}

export interface IAdmin {
  id: string;
  userName: string;
  email: string;
  password: string;
  OTP: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
}

export interface UserParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string; //"asc" or "desc"
}
