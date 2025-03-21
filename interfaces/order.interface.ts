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
  size: string | undefined;
  toppings: string[] | undefined;
  // flavour: string[];
  flavour: string | undefined;
  dateNeeded: string | undefined;
  details: string | undefined;
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
  size: string | undefined;
  toppings: string[] | undefined;
  flavour: string[] | undefined;
  dateNeeded: string | undefined;
  details: string | undefined;
  quantity: number;
}

export interface OrderParams {
  page?: number;
  limit?: number;
  searchQuery?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
}
