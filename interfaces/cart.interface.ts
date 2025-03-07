import { IProduct } from "./product.interface";

export interface ICart {
  product: IProduct;
  size: string;
  toppings: string;
  flavour: string;
  dateNeeded: string;
  details: string;
  quantity: number;
}

export interface addToCartDTO {
  product: string;
  size: string;
  toppings: string;
  flavour: string;
  dateNeeded: string;
  details: string;
  quantity: number;
}

export interface UpdateItemDTO {
  product: string;
  quantity: number;
}
