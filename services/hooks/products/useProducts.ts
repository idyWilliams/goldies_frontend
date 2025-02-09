"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllProducts, getProducts } from ".";
import useUserPdctStore from "@/zustand/userProductStore/store";
import { addSlugToCakes } from "@/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setProducts } from "@/redux/features/product/productSlice";
import { ProductParams } from "@/interfaces/product.interface";

const useProducts = (params: ProductParams) => {
  const dispatch = useAppDispatch();
  const { productList: products } = useAppSelector((state) => state.product);
  const { setAllProducts } = useUserPdctStore();

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ["allProducts", params],
    queryFn: async () => getAllProducts(params),
    placeholderData: keepPreviousData,
  });

  const { productData, totalPages, totalProducts } = useMemo(() => {
    if (!data || isLoading || isError)
      return { productData: [], totalPages: 0, totalProducts: 0 };

    return {
      productData: data.products ?? [],
      totalPages: data.totalPages ?? 0,
      totalProducts: data.totalProducts ?? 0,
    };
  }, [data, isLoading, isError]);

  const processProducts = useMemo(() => {
    return productData.length > 0 ? addSlugToCakes(productData) : [];
  }, [productData]);

  const updateStore = useCallback(() => {
    if (processProducts.length > 0) {
      setAllProducts(processProducts);
      dispatch(setProducts(processProducts));
    } else {
      setAllProducts([]); // Clear Zustand store
      dispatch(setProducts([])); // Clear Redux store
    }
  }, [processProducts, setAllProducts, dispatch]);

  useEffect(() => {
    updateStore();
  }, [updateStore]);

  return { products, isPending, totalPages, totalProducts, isLoading };
};

export default useProducts;
