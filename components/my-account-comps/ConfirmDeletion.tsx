"use client";
import { useAuth } from "@/context/AuthProvider";
import { deleteUserAccount } from "@/services/hooks/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Cookies from "js-cookie";
import { USER_DETAILS, USER_TOKEN_NAME } from "@/utils/constants";
import { setCart } from "@/redux/features/product/cartSlice";
import { useAppDispatch } from "@/redux/hook";

const ConfirmDeletion = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLogin } = useAuth();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const deleteAccount = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      toast.success("Your account has been deleted.");
      setDeleteModalOpen(false);
      setConfirmationText("");
      setError("");
      logOut();
    },
    onError: () => {
      toast.error("Failed to delete your account.");
    },
  });

  const logOut = () => {
    setIsLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    localStorage.setItem("isLogin", JSON.stringify(false));
    Cookies.remove(USER_TOKEN_NAME);
    Cookies.remove(USER_DETAILS);
    router.replace("/sign-in");
    queryClient.invalidateQueries({ queryKey: ["cartList"] });
    dispatch(setCart([]));
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmationText.trim() !== "DELETE MY ACCOUNT") {
      setError(`Please confirm deletion.`);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteAccount.mutateAsync();
    } catch (error) {
      toast.error(
        "An error occurred while deleting your account. Please try again.",
      );
    } finally {
      setIsDeleting(false);
      setError("");
    }
  };

  const handleCancel = () => {
    setDeleteModalOpen(false);
    setConfirmationText("");
    setError("");
  };

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-sm border-red-500 font-medium text-red-500 hover:bg-transparent hover:text-red-500"
        >
          Close account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action is permanent and cannot be undone. Your account will be
          deleted forever. To confirm, type <strong>DELETE MY ACCOUNT</strong>{" "}
          in the field below.
        </DialogDescription>
        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className={`${error && "border-red-500"} form-input w-full rounded border p-2`}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="submit"
              variant="destructive"
              disabled={isDeleting}
              className="rounded-sm"
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              className="rounded-sm"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeletion;
