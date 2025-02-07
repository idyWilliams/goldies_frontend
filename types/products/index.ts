import { Category } from "@/services/types";
import { Option } from "react-multi-select-component";

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

type CategoryOptionsType =
  | {
      label: string;
      value: string;
      disabled: boolean;
      id: any;
      subCategories: any[];
    }[]
  | undefined;

export interface CreatePdctCatAndSubCatPropType {
  categoryOptions: CategoryOptionsType;
  category: string;
  subcatOptions: {
    label: string;
    value: any;
    id: any;
    disabled: boolean;
  }[];
  handleChange: (e: any) => void;
  subCategory: Option[];
  setSubCategory: React.Dispatch<React.SetStateAction<Option[]>>;
}

export interface CreateProductMobilePropTypes {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    formValues: formValuesType;
    setFormValues: React.Dispatch<React.SetStateAction<formValuesType>>;
    handleChange: (e: any) => void;
    images: any;
    setImages: React.Dispatch<any>;
    imagesRef: React.MutableRefObject<(File | null)[]>;
    category: string;
    categoryOptions: CategoryOptionsType;
    subcatOptions: {
      label: string;
      value: any;
      id: any;
      disabled: boolean;
    }[];
    multiSelect: {
      categoryData: {
        name: string;
        id: string;
      };
      setCategoryData: React.Dispatch<
        React.SetStateAction<{
          name: string;
          id: string;
        }>
      >;
      subCategory: Option[];
      setSubCategory: React.Dispatch<React.SetStateAction<Option[]>>;
      shapes: Option[];
      setShapes: React.Dispatch<React.SetStateAction<Option[]>>;
      flavour: Option[];
      setFlavours: React.Dispatch<React.SetStateAction<Option[]>>;
      sizes: Option[];
      setSizes: React.Dispatch<React.SetStateAction<Option[]>>;
      addOn: Option[];
      setAddOn: React.Dispatch<React.SetStateAction<Option[]>>;
    };
  };
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
  category: {
    name: string;
    id: string;
  };
  subCategory: any[];
  categoryOptions: CategoryOptions[] | undefined;
  subcategories: ProductSubCategories[];
  setSubCategory: React.Dispatch<React.SetStateAction<any[]>>;
  formValues: formValuesType;
  handleChange: (e: any) => void;
}

export type ProductVariantsPropType = {
  shapes: Option[];
  setShapes: React.Dispatch<React.SetStateAction<Option[]>>;
  sizes: Option[];
  setSizes: React.Dispatch<React.SetStateAction<Option[]>>;
  flavour: Option[];
  setFlavours: React.Dispatch<React.SetStateAction<Option[]>>;
  addOn: Option[];
  setAddOn: React.Dispatch<React.SetStateAction<Option[]>>;
  productType: string;
};
