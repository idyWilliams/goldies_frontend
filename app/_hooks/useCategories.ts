"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import cs from "/public/assets/milestone-cake.webp";

const useCategories = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selected, setSelected] = useState<any>({
    category: "Milestone Cakes",
    categorySlug: "milestone-cakes",
    description:
      "Milestone cakes commemorate significant life events and achievements.",
    image: cs,
    status: "active",
    subcategories: [
      "Birthday Cakes",
      "Anniversary Cakes",
      "Graduation Cakes",
      "Baby Shower Cakes",
      "Retirement Cakes",
    ],
  });

  const handleEdit = (item: any) => {
    setAction("edit");
    setShowModal(true);
    setSelected(item);
  };

  const handleDelete = (item: any) => {
    setShowModal(true);
    setAction("edit");
    setSelected(item);
    // router.push(`/admin/manage-categories/edit/${item.id}`);
  };

  const handleConfirm = (item: any) => {
    if (action == "delete") {
      // setCategories(categories.filter((item: any) => item.id!== item.id));
      setShowModal(false);
    } else if (action == "edit") {
      console.log(item);

      router.push(
        `/admin/manage-categories/${item.categorySlug}?categoryId=${item._id}`,
      );

      setShowModal(false);
    }
  };

  const handleAddNewCategory = () => {
    router.push("/admin/manage-categories/create");
  };
  return {
    showModal,
    selected,
    handleAddNewCategory,
    handleConfirm,
    handleDelete,
    handleEdit,
  };
};

export default useCategories;
