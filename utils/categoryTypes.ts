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
  cat: string;
  isCategory: boolean;
  sub?: never;
  isSubcategory?: never;
};

export type SubWithSubcategory = {
  sub: string;
  isSubcategory: boolean;
  cat?: never;
  isCategory?: never;
};

export type ModalProps = {
  showModal: boolean;
  setShowModal: any;
  catOrSub: CatWithCategory | SubWithSubcategory;
  actionType: string;
  handleConfirm: any;
};

export type CategoryPageProps = {
  params: any;
};

export type CategoryProps = {
  categoryName: string;
  categorySlug: string;
  description: string;
  image: any | FileList;
  status: boolean;

  // categoryName: string;
  // categorySlug: string;
  // description: string;
  // [x: string]: string;
  // [x: string]: string | boolean | Record<string, any>;
};

export type SubcategoriesProps = {
  category: string;
  subcategoryName: string;
  description: string;
  status: "active" | "inactive";
  image: any | File;
}[];

export type SubategoriesColumns = {
  image: any;
  subCategoryName: string;
  description: string;
  status: string;
};

export type SubCategoryProps = {
  // parentCategory: string;
  subCategoryName: string;
  description: string;
  status: "active" | "inactive";
  image: any | FileList;
  // [x: string]: string;
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
  file: File | null;
  register: UseFormRegister<SubCategoryProps>;
  errors: FieldErrors<SubCategoryProps>;
};

export type SubcategoryInputsProps = {
  control: Control<CategoryProps>;
  register: UseFormRegister<SubCategoryProps>;
  errors: FieldErrors<SubCategoryProps>;
};
