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

type ImagesTypes = {
  image1: "";
  image2: "";
  image3: "";
  image4: "";
};

export interface ProductImagesPropTypes {
  images: ImagesTypes;
  setImages: React.Dispatch<any>;
  imagesRef: React.MutableRefObject<(File | null)[]>;
}
export type MobileImagesPropTypes = {
  images: ImagesTypes;
  setImages: React.Dispatch<any>;
  mobileImgRef: React.MutableRefObject<(File | null)[]>;
};

export type formValuesType = {
  productName: string;
  productDescription: string;
  category: string;
  productType: string;
  maxPrice: number;
  minPrice: number;
};

export interface CreatePdctCatAndSubCatPropType {
  category: string;
  setCategoryData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  subCategory: any[];
  setSubCategory: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface CreateProductMobilePropTypes extends ProductImagesPropTypes {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

type ProductSubCategories = {
  label: string;
  value: any;
  id: any;
  disabled: boolean;
};

type CategoryOptions = {
  label: string;
  value: string;
  disabled: boolean;
  id: any;
  subCategories: any[];
};
export interface InformationAndPricingType {
  category: string;
  setCategoryData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
    }>
  >;
  subCategory: any[];
  categoryOptions: CategoryOptions[] | undefined;
  subcategories: ProductSubCategories[];
  setSubCategory: React.Dispatch<React.SetStateAction<any[]>>;
  formValues: formValuesType;
  handleChange: (e: any) => void;
}

export type ProductVariantsPropType = {
  shapes: [];
  setShapes: React.Dispatch<React.SetStateAction<[]>>;
  sizes: [];
  setSizes: React.Dispatch<React.SetStateAction<[]>>;
  flavour: [];
  setFlavours: React.Dispatch<React.SetStateAction<[]>>;
  addOn: [];
  setAddOn: React.Dispatch<React.SetStateAction<[]>>;
  productType: string;
};
