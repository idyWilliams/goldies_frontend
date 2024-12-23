import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from ".";
import useUserPdctStore from "@/zustand/userProductStore/store";
import { addSlugToCakes } from "@/helper";

const useProducts = (page: number, limit: number) => {
  const [products, setProducts] = useState<any[] | null>(null);
  const setAllProducts = useUserPdctStore((state) => state.setAllProducts);

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ["allProducts", page, limit],
    queryFn: async () => getAllProducts(page, limit),
    placeholderData: keepPreviousData,
  });

  const { fetchedProducts, pages, allProducts } = useMemo(() => {
    if (isLoading || isError)
      return { fetchedProducts: null, pages: null, allProducts: null };

    const fetchedProducts = data;
    const pages = data?.totalPages;
    const allProducts = data?.totalProducts;
    return { fetchedProducts, pages, allProducts };
  }, [isLoading, isError, data]);

  useEffect(() => {
    if (fetchedProducts) {
      setAllProducts(addSlugToCakes(fetchedProducts?.products));
      setProducts(addSlugToCakes(fetchedProducts?.products));
    }
  }, [fetchedProducts, setAllProducts]);

  return { products, isPending, pages, allProducts };
};

export default useProducts;
