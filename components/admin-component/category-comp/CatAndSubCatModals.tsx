"use client";

import React from "react";
import useBoundStore from "@/zustand/store";
import { usePathname } from "next/navigation";
import CreateSubategory from "../subcategory-comp/CreateSubcategory";
import ConfirmModal from "@/components/admin-component/category-comp/ConfirmModal";

const CatAndSubCatModals = () => {
  const pathname = usePathname();
  const showModal = useBoundStore((state) => state.showModal);
  const showSub = useBoundStore((state) => state.showSub);

  if (pathname.endsWith("manage-categories")) {
    return (
      <>
        {showModal && (
          <ConfirmModal
            catOrSub={{
              isCategory: true,
              sub: undefined,
              isSubcategory: undefined,
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {showSub && <CreateSubategory />}

        {showModal && (
          <ConfirmModal
            catOrSub={{
              isCategory: false,
              sub: undefined,
              isSubcategory: undefined,
            }}
          />
        )}
      </>
    );
  }
};

export default CatAndSubCatModals;
