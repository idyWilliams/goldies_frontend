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
  status: string;
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
  subCategoriesOptions: SubCategoriesOption[];
  handleChange: (e: any) => void;
  subCategories: SubCategoriesOption[];
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategoriesOption[]>>;
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
    subCategoriesOptions: SubCategoriesOption[];
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
      subCategories: SubCategoriesOption[];
      setSubCategories: React.Dispatch<
        React.SetStateAction<SubCategoriesOption[]>
      >;
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
  editId: string;
}

export type SubCategoriesOption = {
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
  subCategories: SubCategoriesOption[];
  categoryOptions: CategoryOptions[] | undefined;
  subCategoriesOptions: SubCategoriesOption[];
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategoriesOption[]>>;
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
