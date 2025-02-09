import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getSavedItems } from ".";
import useUserPdctStore from "@/zustand/userProductStore/store";
import useIsLoggedIn from "../users/useIsLoggedIn";

const useSavedItems = () => {
  const isLogin = useIsLoggedIn();

  const { data, isError, isPending, isFetching } = useQuery({
    queryKey: ["savedProducts"],
    queryFn: getSavedItems,
    enabled: isLogin,
  });

  const favorites = useMemo(() => {
    if (isFetching || isError) return null;

    return data?.favorites;
  }, [isFetching, isError, data?.favorites]);

  return { favorites, isPending, isFetching };
};

export default useSavedItems;
