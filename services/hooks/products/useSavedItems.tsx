import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getSavedItems } from ".";

const useSavedItems = () => {
  const {
    data: savedItemsData,
    isLoading: isSavedItemsLoading,
    isError: isSavedItemsError,
    isPending,
  } = useQuery({
    queryKey: ["savedProducts"],
    queryFn: getSavedItems,
  });

  const favorites = useMemo(() => {
    if (isSavedItemsLoading || isSavedItemsError) return null;

    return savedItemsData?.favorites;
  }, [isSavedItemsLoading, isSavedItemsError, savedItemsData?.favorites]);

  return { favorites, isPending };
};

export default useSavedItems;
