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
  _id: string;
  name: string;
  categoryId: string;
  image: string;
  description: string;
  status: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  shapes: string[];
  sizes: string[];
  productType: string;
  toppings: string[];
  category: UCategory;
  subCategories: ISubCategory[];
  minPrice: string;
  maxPrice: string;
  images: string[];
  flavour: string[];
  slug: string;
  status: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  reviewsCount: number;
  ratingsCount: IRatingsCount;
  likesCount: number;
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

export interface CategoryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortByProducts?: string;
  sortBySubcategories?: string;
  sortByStatus?: string;
  order?: string;
}

export interface IRatingsCount {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  total: number;
}
