import { formValuesType } from "@/types/products";
import React, { useEffect, useRef, useState } from "react";
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
  });

  const [categoryData, setCategoryData] = useState<{
    name: string;
    id: string;
  }>({ name: "", id: "" });

  const [subCategory, setSubCategory] = useState<any[]>([]);

  const [shapes, setShapes] = useState<[]>([]);
  const [flavour, setFlavours] = useState<[]>([]);
  const [sizes, setSizes] = useState<[]>([]);
  const [addOn, setAddOn] = useState<[]>([]);

  const [images, setImages] = useState<any>({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const imagesRef = useRef<(File | null)[]>([null, null, null, null]);

  const { categories } = useCategories();
  const category = formValues.category;

  const { categoryOptions, subcatOptions } = useCategoryOptions({
    categories,
    category,
  });

  useEffect(() => {
    if (category) {
      console.log(category);

      setSubCategory([]);
      const activeCategory = categoryOptions?.find(
        (option) => option.value === category,
      );

      if (activeCategory)
        setCategoryData({ name: activeCategory.value, id: activeCategory.id });
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
