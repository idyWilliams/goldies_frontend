import React from "react";
import {
  Control,
  FieldError,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type CatWithCategory = {
  isCategory: boolean;
  sub?: never;
  isSubcategory?: never;
};

export type SubWithSubcategory = {
  isSubcategory: boolean;
  cat?: never;
  isCategory?: never;
};

export type ModalProps = {
  catOrSub: CatWithCategory | SubWithSubcategory;
  // handleConfirm: any;
};

export type CategoryProps = {
  [x: string]: any;
  categoryName: string;
  categorySlug: string;
  description: string;
  image: any | FileList;
  status: boolean;
};

export type SubcategoriesProps = {
  [x: string]: any;
  category: string;
  subcategoryName: string;
  description: string;
  status: "active" | "inactive";
  image: any | FileList;
}[];

export type SubategoriesColumns = {
  image: any;
  name: string;
  description: string;
  status: string;
};

export type SubCategoryProps = {
  [x: string]: any;
  name: string;
  description: string;
  image: any | FileList;
  status: boolean;
};

export type CategoryInputsProps = {
  control: Control<CategoryProps>;
  register: UseFormRegister<CategoryProps>;
  errors: FieldErrors<CategoryProps>;
  getValues: UseFormGetValues<CategoryProps>;
  setValue: UseFormSetValue<CategoryProps>;
};

export type CategoryImageProps = {
  register: UseFormRegister<CategoryProps>;
  errors: FieldErrors<CategoryProps>;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};
export type SubCategoryImageProps = {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<SubCategoryProps>;
  errors: FieldErrors<SubCategoryProps>;
};

export type SubcategoryInputsProps = {
  control: Control<SubCategoryProps>;
  register: UseFormRegister<SubCategoryProps>;
  errors: FieldErrors<SubCategoryProps>;
  getValues: UseFormGetValues<SubCategoryProps>;
  setValue: UseFormSetValue<SubCategoryProps>;
};
