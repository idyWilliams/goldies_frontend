import { IProduct } from "./product.interface";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  favorites: IProduct[];
  billingInfo: IShippingAddress[];
  createdAt: string;
  updatedAt: string;
  hashedPassword?: string;
}

export interface IShippingAddress {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phonenumber: string;
  isDefault: boolean;
}

export interface IAdmin {
  _id: string;
  userName: string;
  email: string;
  password: string;
  OTP: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
}
