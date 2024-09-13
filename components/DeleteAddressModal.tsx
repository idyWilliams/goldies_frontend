import React from "react";
import { Button } from "./ui/button";
import goldis from "../public/assets/goldis-gold-logo.png";
import close from "../public/assets/close-square.png";
import {
  Dialog,
  //   DialogContent,
  //   DialogDescription,
  //   DialogHeader,
  //   DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const DeleteAddressModal = ({ onClose }: any) => {
  return (
    <Dialog>
      <div className=" fixed top-60 z-50 rounded-lg border-4 border-black bg-black md:w-1/2">
        <div className="border-6 flex flex-col gap-6  p-5 text-[#fff]">
          <header className="flex justify-between ">
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
          </header>
          <div className=" font-[400px] text-[14px] ">
            Are you sure you want to delete Milestone Cakes categories? Deleting
            this category means you will remove the category, products and
            subcategories under it and cant be undone.
          </div>
          <div className="flex gap-6">
            <Button variant="outline" size="lg" className="bg-goldie-300 text-[#0F0904;]" >
              Yes, Edit
            </Button>
            <Button variant="destructive" size="lg" onClick={onClose}>
              No, Continue
            </Button>
            {/* use button components */}
            {/* <button
              //   onClick={onClose}
              type="submit"
              className="w-30 rounded-md border-2 bg-goldie-300 px-6 py-1 text-sm"
            >
              Yes, Edit
            </button>
            <button
              //   onClick={onClose}
              className="w-30 rounded-md border-2 bg-red-600 px-6 py-1 text-sm text-white"
            >
              No, Continue
            </button> */}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteAddressModal;

{
  /* <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete Milestone Cakes categories? Deleting
            // this category means you will remove the category, products and //
            subcategories under it and cant be undone..
          </DialogDescription>
        </DialogHeader>
      </DialogContent> */
}
