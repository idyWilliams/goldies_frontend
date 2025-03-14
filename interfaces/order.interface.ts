import { IProduct } from "./product.interface";

export interface IFee {
  subTotal: number;
  total: number;
  deliveryFee: number;
  // _id: string;
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
  orderedItems: IOrderProduct[];
  fee: IFee;
  user: string;
  orderStatus: "pending" | "completed" | "cancelled";
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderProduct {
  product: IProduct;
  size: string;
  toppings: string[];
  // flavour: string[];
  flavour: string;
  dateNeeded: string;
  details: string;
  quantity: number;
}

export interface CreateOrderDTO {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  cityOrTown: string;
  state: string;
  streetAddress: string;
  phoneNumber: string;
  orderedItems: IOrderedItems[];
  fee: IFee;
}

export interface IOrderedItems {
  product: string;
  size: string;
  toppings: string[];
  flavour: string;
  // flavour: string[];
  dateNeeded: string;
  details: string;
  quantity: number;
}
