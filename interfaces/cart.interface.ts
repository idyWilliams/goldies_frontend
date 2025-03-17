import { IProduct } from "./product.interface";

export interface ICart {
  product: IProduct;
  size: string | undefined;
  toppings: string[] | undefined;
  // flavour: string[] | undefined;
  flavour: string | undefined;
  dateNeeded: string | undefined;
  details: string | undefined;
  quantity: number;
}

export interface addToCartDTO {
  product: string;
  size: string | undefined;
  toppings: string[] | undefined;
  flavour: string | undefined;
  // flavour: string[] | undefined;
  dateNeeded: string | undefined;
  details: string | undefined;
  quantity: number;
}

export interface UpdateItemDTO {
  product: string;
  quantity: number;
}
