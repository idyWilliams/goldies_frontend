import { useEffect, useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useBoundStore from "@/zustand/store";
import { getAllCategories } from ".";

const useCategories = () => {
  const { categories, setCategories } = useBoundStore();

  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    placeholderData: keepPreviousData,
  });

  const memoisedCategories = useMemo(() => {
    if (data?.categories) {
      return data?.categories;
    } else return null;
  }, [data?.categories]);

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
    totalCategories: data?.totalCategories,
  };
};

export default useCategories;
