export interface ICategory {
  name: string;
  id: string;
  _id: string;
}

export interface ISubCategory {
  name: string;
  id: string;
  _id: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  shapes: string[];
  sizes: string[];
  productType: string;
  toppings: string[];
  category: ICategory;
  subCategory: ISubCategory[];
  minPrice: string;
  maxPrice: string;
  images: string[];
  flavour: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  weight?: string;
  ingredients?: string[];
  allergens?: string[];
  available?: boolean;
  bestSeller?: boolean;
}
