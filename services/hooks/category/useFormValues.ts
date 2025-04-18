import {
  formValuesType,
  SubCategoriesOption
} from "@/types/products";
import { useEffect, useRef, useState } from "react";
import { Option } from "react-multi-select-component";
import useCategories from "./useCategories";
import useCategoryOptions from "./useCategoryOptions";

const useFormValues = () => {
  const [formValues, setFormValues] = useState<formValuesType>({
    productName: "",
    productDescription: "",
    category: "",
    productType: "",
    maxPrice: 0,
    minPrice: 0,
    status: "available",
  });

  const [categoryData, setCategoryData] = useState<{
    name: string;
    id: string;
  }>({ name: "", id: "" });

  const [subCategories, setSubCategories] = useState<SubCategoriesOption[]>([]);

  const [shapes, setShapes] = useState<Option[]>([]);
  const [flavour, setFlavours] = useState<Option[]>([]);
  const [sizes, setSizes] = useState<Option[]>([]);
  const [addOn, setAddOn] = useState<Option[]>([]);

  const [images, setImages] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const imagesRef = useRef<(File | null)[]>([null, null, null, null]);

  const { categories: allCategories } = useCategories();
  const category = formValues.category;

  const { categoryOptions, subCategoriesOptions } = useCategoryOptions({
    categories: allCategories,
    category: formValues.category,
  });

  useEffect(() => {
    if (category) {
      const activeCategory = categoryOptions?.find(
        (option) => option.value === category,
      );

      if (activeCategory)
        setCategoryData({ name: activeCategory.label, id: activeCategory.id });
    }
    if (!category) setSubCategories([]);
  }, [category, setSubCategories, categoryOptions, setCategoryData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const updatedValues = {
      ...formValues,
      [name]:
        name === "maxPrice" || name === "minPrice" ? Number(value) : value,
    };

    // Log the updated formValues
    // console.log("Updated formValues:", updatedValues);

    setFormValues(updatedValues);
  };

  const data = {
    formValues,
    setFormValues,
    handleChange,
    images,
    setImages,
    imagesRef,
    category,
    categoryOptions,
    subCategoriesOptions,
    multiSelect: {
      categoryData,
      setCategoryData,
      subCategories,
      setSubCategories,
      shapes,
      setShapes,
      flavour,
      setFlavours,
      sizes,
      setSizes,
      addOn,
      setAddOn,
    },
  };

  return data;
};

export default useFormValues;
