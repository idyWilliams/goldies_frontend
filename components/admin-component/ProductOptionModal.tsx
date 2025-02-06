import { IProduct } from "@/interfaces/product.interface";
import { deleteProduct } from "@/services/hooks/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export default function ProductOptionModal({
  action,
  product,
  setShowModal,
}: {
  action: string;
  product: IProduct;
  setShowModal: (value: boolean) => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDeleteProduct = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      setShowModal(false);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleConfirm = () => {
    if (action.toLowerCase() === "edit") {
      router.push(`/admin/create-products?edit=${product._id}`);
    } else if (action === "delete") {
      handleDeleteProduct.mutate(product?._id);
    }
  };
  return (
    <section className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-[300px] rounded-md bg-white p-6">
        <h3>
          Are you sure you want to {action}{" "}
          <span className="capitalize">{product.name}</span>?
        </h3>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="rounded bg-green-600 px-4 py-2 text-sm text-white"
            onClick={handleConfirm}
          >
            Yes
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-sm text-white"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}
