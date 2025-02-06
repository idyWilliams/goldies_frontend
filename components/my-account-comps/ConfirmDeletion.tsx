"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const deleteUserAccount = async (): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Account deleted (dummy function)");
      resolve({ success: true });
    }, 2000); // Simulates a network request delay
  });
};

const ConfirmDeletion = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState("");

  const deleteAccount = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      toast.success("Your account has been deleted.");
      setDeleteModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete your account.");
    },
  });

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmationText.trim() !== "DELETE MY ACCOUNT") {
      setError(`Please type "DELETE MY ACCOUNT" to confirm deletion.`);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteAccount.mutateAsync();
      setConfirmationText("");
      setError("");
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
              className="form-input w-full rounded border p-2"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button type="submit" variant="destructive" disabled={isDeleting} className="rounded-sm">
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel} className="rounded-sm">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeletion;
