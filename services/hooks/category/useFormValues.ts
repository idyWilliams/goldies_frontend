import { formValuesType } from "@/types/products";
import React, { useEffect, useRef, useState } from "react";
import useCategories from "./useCategories";
import useCategoryOptions from "./useCategoryOptions";
import { Option } from "react-multi-select-component";

const useFormValues = () => {
  const [formValues, setFormValues] = useState<formValuesType>({
    productName: "",
    productDescription: "",
    category: "",
    productType: "",
    maxPrice: 0,
    minPrice: 0,
    status: "Available",
  });

  const [categoryData, setCategoryData] = useState<{
    name: string;
    id: string;
  }>({ name: "", id: "" });

  const [subCategory, setSubCategory] = useState<any[]>([]);

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

  const { categoryOptions, subcatOptions } = useCategoryOptions({
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
    if (!category) setSubCategory([]);
  }, [category, setSubCategory, categoryOptions, setCategoryData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "maxPrice" || name === "minPrice" ? Number(value) : value,
    }));
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
    subcatOptions,
    multiSelect: {
      categoryData,
      setCategoryData,
      subCategory,
      setSubCategory,
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
