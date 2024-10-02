<<<<<<< HEAD
import React from "react";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";
import CategoryForm from "@/components/admin-component/category-comp/CategoryForm";
import SubCategories from "@/components/admin-component/subcategory-comp/SubCategoriesTable";
import CatAndSubCatModals from "@/components/admin-component/category-comp/CatAndSubCatModals";
=======
"use client";
import ProductTable from "@/components/admin-component/ProductTable";
import CreateSubategory from "@/components/admin-component/category-comp/CreateSubcategory";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { newCategory, newSubcategory } from "@/utils/formData";
import { yupResolver } from "@hookform/resolvers/yup";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowLeft, Edit, GalleryImport, Trash } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import * as yup from "yup";
import cs from "../../../../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import {
  CategoryPageProps,
  CategoryProps,
  SubategoriesColumns,
} from "@/utils/categoryTypes";
import ConfirmModal from "@/components/admin-component/category-comp/ConfirmModal";

const schema = yup.object().shape({
  categoryName: yup.string().required("Subcategory name is required"),
  categorySlug: yup.string().required("Subcategory slug is required"),
  description: yup.string().required("Subcategory description is required"),
});

const columnHelper = createColumnHelper<SubategoriesColumns>();
const columns = [
  columnHelper.accessor((row) => row, {
    id: "SubImage",
    cell: (info) => {
      return (
        <div className="">
          <Image
            src={cs}
            // src={info.cell.row.original.image} // Switch to this once api is available
            alt={info.cell.row.original.subCategoryName}
            width={150}
            height={150}
            className="h-[80px] w-[100px] object-cover"
          />
        </div>
      );
    },
    header: () => <span> </span>,
  }),
  columnHelper.accessor("subCategoryName", {
    header: () => <span>Subcategory</span>,

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("description", {
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "status",
    cell: (info) => <StatusBar status={info.cell.row.original.status} />,
    header: () => <span>Status</span>,
  }),

  columnHelper.accessor((row) => row, {
    id: "action",
    cell: (info) => (
      <div className="space-x-2">
        <span
          // onClick={() => handleEdit(item)}
          className="cursor-pointer text-blue-600"
        >
          <Edit size={24} />
        </span>
        <span
          // onClick={() => handleDelete(item)}
          className="cursor-pointer text-red-600"
        >
          <Trash size={24} />
        </span>
      </div>
    ),
    header: () => <span>Actions</span>,
    footer: (info) => info.column.id,
  }),
];

const Page = ({ params }: CategoryPageProps) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
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
  const [category, setCategory] = useState<CategoryProps>({
    categoryName: "",
    categorySlug: "",
    description: "",
  });
  const [subcategories, setSubcategories] = useState<any[]>([
    {
      parentCategory: "dh2dh2",
      subCategoryName: "Anniversary Cakes",
      description: "j2djd",
      status: "active",
      image: cs,
    },
    {
      parentCategory: "dh2dh2",
      subCategoryName: "Baby Shower Cakes",
      description: "j2djd",
      status: "inactive",
      image: cs,
    },
  ]);
  const [showSub, setShowSub] = useState(false);
  const [cateStatus, setCateStatus] = useState(true);
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: "Milestone Cakes",
      categorySlug: "milestone-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  const handleAddSubcategory = () => {
    setShowSub(true);
  };

  // FILE UPLOAD FUNCTIONS
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(url);
    }
  };

  const handleRemoveCateImg = () => {
    setImage(null);
    setImageUrl("");
    setDragging(false);
  };

  // HANDLE INPUT VALUES CHANGES
  const handleCateChanges = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategory((cate: any) => {
      return {
        ...cate,
        [name]: value,
      };
    });

    console.log(category);
  };

  const isDisabled =
    category.categoryName === "" ||
    category.categorySlug === "" ||
    category.description === "";

  // console.log(isDisabled, category);

  const handleEdit = (item: any, index: number) => {
    setAction("edit");
    setShowModal(true);
    setSelected({ ...item, id: index });
  };

  const handleDelete = (item: any) => {
    setShowModal(true);
    setAction("delete");
    setSelected(item);
    // router.push(`/admin/manage-categories/edit/${item.id}`);
  };

  const handleConfirm = () => {
    if (action == "delete") {
      // setCategories(categories.filter((item: any) => item.id!== item.id));
      setShowModal(false);
    } else if (action == "edit") {
      setShowModal(false);
      setShowSub(true);
    }
  };

  // SIDE EFFECTS: USE EFFECTS HOOKS
  // useEffect(() => {
  //   if (category?.categoryName) {
  //     setValue(
  //       "categorySlug",
  //       `${category?.categoryName?.toLowerCase()?.replace(/ /g, "-")}`,
  //     );

  //     setCategory((cate: any) => {
  //       return {
  //         ...cate,
  //         categorySlug: `${category?.categoryName?.toLowerCase()?.replace(/ /g, "-")}`,
  //       };
  //     });
  //   }
  // }, []);

  useEffect(() => {
    reset({
      categoryName: "Milestone Cakes",
      categorySlug: "milestone-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
    });
    setCategory({
      categoryName: "Milestone Cakes",
      categorySlug: "milestone-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
    });
  }, [reset]);
>>>>>>> a022fa5173620546ba0d46150597ef360e9a9fa3

const Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <CategoryHeader />
        <CategoryForm />

        <SubCategories />
      </section>

      <CatAndSubCatModals />
    </>
  );
};

export default Page;
