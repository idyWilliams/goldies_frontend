export interface ICategory {
  name: string;
  id: string;
  _id: string;
}

export interface UCategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  categorySlug: string;
  status: boolean;
  subCategories: ISubCategory[];
}
export interface ICategories {
  _id: string;
  name: string;
  description: string;
  image: string;
  categorySlug: string;
  status: boolean;
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
  slug: string;
  status: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductParams {
  subCategoryIds?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  page?: number;
  limit?: number;
  sortBy?: string; // "createdAt"
  order?: string; //"asc" or "desc"
}
