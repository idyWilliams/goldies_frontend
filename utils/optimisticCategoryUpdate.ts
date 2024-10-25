import { QueryDataType } from "@/components/admin-component/category-comp/CategoryForm";
import {
  Category,
  CategoryId,
  EditCategory,
  SubCategory,
} from "@/services/types";

type SubCatQueryDataType = {
  [x: string]: any;
  category: Category;
};

export function optimisticCategoryUpdate(
  type: string,
  oldData: QueryDataType,
  //   variable: EditCategory | CategoryId,
  variable: any,
  //   variable: Category | { category: Category; categoryId?: string } | string,
) {
  if (!oldData) return null;
  console.log(oldData);

  const newarr = { ...oldData };
  const newCat: Category[] = [...newarr.categories];

  if (type === "edit" || type === "delete") {
    if (type === "edit") {
      const updatedCategory = newCat.map((cat) => {
        return cat._id === variable?.categoryId
          ? {
              ...cat,
              ...variable,
              // _id: variable?.categoryId,
            }
          : cat;
      });

      const newCategories = { ...newarr, categories: updatedCategory };
      return newCategories;
    } else {
      const updatedCategory = newCat.filter((cat) => cat._id !== variable);

      const newCategories = { ...newarr, categories: updatedCategory };
      return newCategories;
    }
  } else {
    const newCategories = {
      ...newarr,
      categories: [...newCat, { ...variable, _id: variable.categorySlug }],
    };

    return newCategories;
  }
}

export function optimisticSubCatUpdate(
  type: string,
  oldData: SubCatQueryDataType,
  variable: any,
) {
  if (!oldData) return null;

  const queryData = { ...oldData };
  const category: Category = { ...queryData.category };

  const subCategories: SubCategory[] = [...category.subCategories];

  if (type === "edit" || type === "delete") {
    if (type === "edit") {
      const updatedSubCategories = subCategories.map((subCat) => {
        return subCat._id === variable?.subCategoryId
          ? {
              ...subCat,
              ...variable.subCategory,
              // _id: variable?.categoryId,
            }
          : subCat;
      });

      const newCategory = {
        ...queryData,
        category: { ...category, subCategories: [...updatedSubCategories] },
      };

      return newCategory;
    } else {
      const updatedSubCategories = subCategories.filter(
        (subCat) => subCat._id !== variable,
      );

      const newCategory = {
        ...queryData,
        category: { ...category, subCategories: [...updatedSubCategories] },
      };
      return newCategory;
    }
  } else {
    const newCategory = {
      ...queryData,
      category: {
        ...category,
        subCategories: [
          ...subCategories,
          {
            ...variable,
            _id: variable.name,
          },
        ],
      },
    };

    return newCategory;
  }
}
