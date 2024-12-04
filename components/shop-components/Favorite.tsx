import React, { useEffect, useState } from "react";
import { DialogCloseButton } from "../DialogModal";
import { Heart } from "iconsax-react";
import { useMutation } from "@tanstack/react-query";
import { addFavorites, removeFavorites } from "@/services/hooks/products";
import { toast } from "sonner";
import useUserPdctStore from "@/zustand/userProductStore/store";
import { AxiosError } from "axios";

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
  const [isLogin, setIsLogin] = useState<boolean>();
  const favProducts = useUserPdctStore((state) => state.favProducts);

  const [previewFav, setPreviewFav] = useState(false);

  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);

  useEffect(() => {
    const found = favProducts.find((favProduct) => favProduct._id === data._id);
    found ? true : false;
  }, [data._id, favProducts]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = JSON.parse(localStorage.getItem("user") as string);
      setIsLogin(Boolean(isLoggedIn));
    }
  }, []);

  const saveFavorites = useMutation({
    mutationFn: addFavorites,
    onSuccess: (data) => {
      setFav(true);
      toast.success(data?.message);
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
  });

  const handleSavedItem = (data: any) => {
    if (!isLogin) return;

    if (!fav) {
      saveFavorites.mutate(data._id);
    } else {
      setFav(false);
      setPreviewFav(false);
      deleteFavorites
        .mutateAsync(data._id)
        .then((res) => {
          toast.success(res?.message);
          setFavProducts(res.favorites);
        })
        .catch((err) => {
          const error = err.response?.data?.message;
          toast.error(error);
          setFav(true);
        });
    }
  };
  return (
    <span
      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5px] bg-black bg-opacity-50 text-goldie-300"
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
        <DialogCloseButton>
          <Heart size={20} variant={fav || previewFav ? "Bold" : undefined} />
        </DialogCloseButton>
      )}
    </span>
  );
};

export default Favorite;
