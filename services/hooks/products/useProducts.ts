import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAllProducts, getSavedItems } from ".";
import useUserPdctStore from "@/zustand/userProductStore/store";
import useSavedItems from "./useSavedItems";

const useProducts = (
  page: number,
  limit: number,
  setTotalPages: Dispatch<SetStateAction<number>>,
  setTotalProducts: Dispatch<SetStateAction<number>>,
) => {
  const [products, setProducts] = useState<any[] | null>(null);

  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ["allProducts", page, limit],
    queryFn: async () => getAllProducts(page, limit),
    placeholderData: keepPreviousData,
  });

  const {favorites} = useSavedItems();

  const { fetchedProducts, pages, totalProducts } = useMemo(() => {
    if (isLoading || isError)
      return { fetchedProducts: null, pages: null, totalProducts: null };
    console.log(data);
    const fetchedProducts = data?.products.filter(
      (prod: any) => !prod.images[0].includes("example"),
    );
    const pages = data?.totalPages;
    const totalProducts = data?.totalProducts;
    return { fetchedProducts, pages, totalProducts };
  }, [isLoading, isError, data]);

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
      setTotalPages(pages);
      setTotalProducts(totalProducts);
    }
  }, [fetchedProducts, pages, totalProducts, setTotalPages, setTotalProducts]);

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  return { products, isPending };
};

export default useProducts;
