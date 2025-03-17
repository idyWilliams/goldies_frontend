import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface CreateReviewDTO {
  productId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewDTO {
  rating: number;
  comment: string;
}

export interface IReview {
  _id: string;
  user: IUser;
  product: IProduct
  rating: number;
  comment: string
  createdAt: string;
  updatedAt: string;
}