import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getSavedItems } from ".";
import useUserPdctStore from "@/zustand/userProductStore/store";
import useIsLoggedIn from "../users/useIsLoggedIn";

const useSavedItems = () => {
  const isLogin = useIsLoggedIn();

  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["savedProducts"],
    queryFn: getSavedItems,
    enabled: isLogin,
  });

  const favorites = useMemo(() => {
    if (isLoading || isError) return null;

    return data?.favorites;
  }, [isLoading, isError, data?.favorites]);

  return { favorites, isPending };
};

export default useSavedItems;
