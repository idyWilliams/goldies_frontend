export type ICake = {
  id: number;
  name: string;
  description: string;
  minPrice: string;
  maxPrice: string;
  imageUrl: string;
  ingredients: string[];
  allergens: string[];
  weight: string;
  available: boolean;
    bestSeller: boolean;
    slug: string;
    quantity?: number;
};
