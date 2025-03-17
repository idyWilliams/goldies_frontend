import React, { useEffect, useState } from "react";
import { DialogCloseButton } from "../DialogModal";
import { Heart } from "iconsax-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorites, removeFavorites } from "@/services/hooks/products";
import { toast } from "sonner";
import useUserPdctStore from "@/zustand/userProductStore/store";
import { AxiosError } from "axios";
import useIsLoggedIn from "@/services/hooks/users/useIsLoggedIn";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

const Favorite = ({
  fav,
  setFav,
  data,
}: {
  fav?: boolean;
  setFav: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}) => {
  const [previewFav, setPreviewFav] = useState(false);
  const favProducts = useUserPdctStore((state) => state.favProducts);
  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);
  // const addFavProduct = useUserPdctStore((state) => state.addFavProduct);
  const removeFavProducts = useUserPdctStore((state) => state.removeFavProduct);
  const isLogin = useIsLoggedIn();
  const queryClient = useQueryClient();

  useEffect(() => {
    const found = favProducts.find((favProduct) => favProduct._id === data._id);

    if (found) setFav(true);
    else setFav(false);
  }, [data._id, favProducts, setFav]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const isLoggedIn = JSON.parse(localStorage.getItem("user") as string);
  //     setIsLogin(Boolean(isLoggedIn));
  //   }
  // }, []);

  const saveFavorites = useMutation({
    mutationFn: addFavorites,
    onSuccess: (data) => {
      setFav(true);
      setPreviewFav(false);
      toast.success(data?.message);
      // addFavProduct(data);
      setFavProducts(data?.favorites);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
      if (errorMessage === "Products already in favorites") {
        setFav(true);
      } else {
        setFav(false);
        setPreviewFav(false);
      }
    },
  });

  const deleteFavorites = useMutation({
    mutationFn: removeFavorites,
    onSuccess: (data) => {
      toast.success(data?.message);
      setFav(false);
      setPreviewFav(false);
      removeFavProducts(data._id);
      queryClient.invalidateQueries({ queryKey: ["savedProducts"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setFav(true);
      setPreviewFav(false);
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleSavedItem = (data: any) => {
    console.log(isLogin);

    if (!isLogin) {
      setPreviewFav(false);
      return;
    }

    if (!fav) {
      saveFavorites.mutate(data._id);
    } else {
      deleteFavorites.mutate(data._id);
    }
  };
  return (
    <span
      className="mr-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5px] bg-black bg-opacity-50 text-brand-100"
      onClick={() => handleSavedItem(data)}
      onMouseEnter={() => setPreviewFav(true)}
      onMouseLeave={() => {
        if (fav) return;
        setPreviewFav(false);
      }}
    >
      {isLogin ? (
        <Heart size={20} variant={fav || previewFav ? "Bold" : undefined} />
      ) : (
        <DialogCloseButton setPreviewFav={setPreviewFav}>
          <Heart size={20} variant={fav || previewFav ? "Bold" : undefined} />
        </DialogCloseButton>
      )}
    </span>
  );
};

export default Favorite;
