import { IProduct } from "./product.interface";

export interface IFee {
  subTotal: number;
  total: number;
  deliveryFee: number;
  _id: string;
}

export interface IOrder {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  cityOrTown: string;
  state: string;
  streetAddress: string;
  phoneNumber: string;
  orderedItems: IProduct[]; 
  fee: IFee;
  user: string; 
  orderStatus: "pending" | "completed" | "cancelled"; 
  orderId: string;
  createdAt: string;
  updatedAt: string; 
}
