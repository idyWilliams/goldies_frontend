import Image from "next/image";
import close from "../public/assets/close-square.png";
import goldis from "../public/assets/goldis-gold-logo.png";
import { Button } from "./ui/button";
import { IBillingInfo } from "@/interfaces/user.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBilling } from "@/services/hooks/payment";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface DeleteProps {
  onClose: () => void;
  data: IBillingInfo;
}

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

const DeleteAddressModal = ({ onClose, data }: DeleteProps) => {
  const queryClient = useQueryClient();

  const handleDeleteProduct = useMutation({
    mutationFn: deleteBilling,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["allBllingInfo"] });
      onClose();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const resError = error.response?.data;
      console.error(resError);
      const errorMessage = resError?.message ? resError?.message : resError;
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleConfirm = () => {
    handleDeleteProduct.mutate(data?._id);
  };

  return (
    <div className="rounded-lg border-4 border-black bg-black">
      <div className="border-6 flex flex-col gap-6  p-5 text-[#fff]">
        <div className="flex justify-between ">
          <Image
            src={goldis}
            className="flex w-[100px] items-center"
            alt="Goldis Logo sm"
          />
          <button onClick={onClose} className="">
            <Image
              src={close}
              className="flex w-[30px] items-center"
              alt="close"
            />
          </button>
        </div>

        <div className=" text-[14px] font-[400px] ">
          Are you sure you want to delete your address from the account
          information? Deleting your address means you will remove the all
          information under it and cant be undone.
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="bg-goldie-300 text-[#0F0904;] hover:bg-goldie-400"
            onClick={handleConfirm}
          >
            Yes, Continue
          </Button>
          <Button variant="destructive" onClick={onClose}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressModal;

