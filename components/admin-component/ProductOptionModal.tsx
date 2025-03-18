import { cn } from "@/helper/cn";
import { IProduct } from "@/interfaces/product.interface";
import Goldie from "@/public/assets/goldis-gold-logo.png";
import { deleteProduct } from "@/services/hooks/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CloseSquare } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    <div
      className={cn(
        "fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-45 p-4",
      )}
    >
      <div className="w-full rounded-lg bg-neutral-900 sm:w-[400px] md:w-[500px]">
        <div className="flex items-center justify-between border-b border-goldie-300 border-opacity-40 px-4 py-4">
          <Image src={Goldie} alt="Goldie" className="w-[120px]" />

          <span
            className="cursor-pointer text-brand-200"
            onClick={() => setShowModal(false)}
          >
            <CloseSquare size={24} />
          </span>
        </div>
        <div className="px-4 py-5">
          <h3 className="leading-7 text-white">
            Are you sure you want to {action}{" "}
            <span className="font-semibold capitalize">{product.name}</span>?
          </h3>
          <div className="mt-5 space-x-3">
            <button
              className="cursor-pointer rounded-md bg-goldie-300 px-4 py-1.5 text-sm text-neutral-900"
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-md bg-red-600 px-4 py-1.5 text-sm text-neutral-50"
              onClick={() => setShowModal(false)}
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
