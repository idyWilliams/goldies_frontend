import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useBoundStore from "@/zustand/store";
import { getAllCategories } from ".";
import { usePathname } from "next/navigation";
import { Category } from "@/services/types";

const useCategories = () => {
  const categories = useBoundStore((state) => state.categories);
  const setCategories = useBoundStore((state) => state.setCategories);
  const pathname = usePathname();

  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    enabled: !categories,
  });

  const memoisedCategories = useMemo(() => {
    if (isSuccess) {
      return data?.categories;
    } else return null;
  }, [isSuccess, data?.categories]);

  useEffect(() => {
    if (isSuccess && memoisedCategories) {
      setCategories(memoisedCategories);
    }
  }, [isSuccess, memoisedCategories, setCategories]);

  useEffect(() => {
    if (isError) {
      console.error(error?.message);
    }
  }, [isError, error?.message]);

  return {
    categories,
    isPending,
    isError,
    error,
  };
};

export default useCategories;
