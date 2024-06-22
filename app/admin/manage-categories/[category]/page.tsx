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
      console.log(info, "column");
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
  useEffect(() => {
    if (category?.categoryName) {
      setValue(
        "categorySlug",
        `${category?.categoryName?.toLowerCase()?.replace(/ /g, "-")}`,
      );

      setCategory((cate: any) => {
        return {
          ...cate,
          categorySlug: `${category?.categoryName?.toLowerCase()?.replace(/ /g, "-")}`,
        };
      });
    }
  }, []);

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
  }, []);

  return (
    <>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 ">
          <Link
            href={"/admin/manage-categories"}
            className="inline-flex cursor-pointer items-center gap-2"
          >
            <span>
              <ArrowLeft size="24" />
            </span>
            <h1 className="font-bold">
              {isNewCreate ? "New Category" : "Edit Category"}
            </h1>
          </Link>
          <button className="bg-neutral-900 px-4 py-2 text-sm text-goldie-300">
            Create Category
          </button>
        </div>

        <div className="md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
          <input
            type="file"
            name="file1"
            id="file1"
            className="hidden"
            onChange={(e) => handleChange(e)}
            accept="image/jpeg, image/png, image/webp"
          />
          {!imageUrl && (
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={cn(
                "flex h-[250px] w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-zinc-50 px-4 py-6 md:h-full xl:h-[250px]",
                dragging &&
                  "border-2 border-solid border-neutral-900 bg-sky-100 shadow-inner",
              )}
            >
              <span className="mb-3 inline-block text-neutral-400 opacity-50">
                <GalleryImport size={60} />
              </span>
              <label
                htmlFor="file1"
                className="cursor-pointer text-balance text-center text-neutral-400"
              >
                Drop image here or <u>click here</u> to upload image
              </label>
            </div>
          )}

          {imageUrl && (
            <div className="group relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-md md:h-[350px] xl:h-[250px]">
              <Image
                src={imageUrl}
                alt="upload-image"
                width={200}
                height={300}
                className="h-full w-full object-cover"
              />

              <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-black bg-opacity-25 opacity-0 duration-300 group-hover:opacity-100">
                <label
                  htmlFor="file1"
                  className="inline-block cursor-pointer rounded-md bg-white px-6 py-2"
                >
                  Replace
                </label>
                <button
                  onClick={handleRemoveCateImg}
                  className="cursor-pointer rounded-md bg-goldie-300 px-6 py-2"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 md:mt-0 md:h-min">
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="create-category"
              className="md:grid md:gap-3 xl:grid-cols-2"
            >
              <EachElement
                of={newCategory}
                render={(data: any, index: number) => {
                  if (data.name === "status") {
                    return (
                      <>
                        <label
                          htmlFor={data?.name}
                          className="mt-2 inline-flex items-center gap-2 md:mt-0"
                        >
                          <span className="text-sm font-semibold">
                            {data?.label}:{" "}
                          </span>
                          <Controller
                            control={control}
                            name={data.name}
                            render={({ field: { onChange } }) => (
                              <Toggle
                                checked={cateStatus}
                                className="custom"
                                name={data.name}
                                value={cateStatus ? "yes" : "no"}
                                icons={{ checked: null, unchecked: null }}
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                  setCateStatus(e.target.checked);
                                }}
                              />
                            )}
                          />
                        </label>
                      </>
                    );
                  }
                  return (
                    <>
                      <div
                        key={index}
                        className={cn(
                          "mt-3 md:mt-0",
                          data?.type === "richtext" && "xl:col-span-2",
                        )}
                      >
                        <label htmlFor={data.name} className="block w-full">
                          <span
                            className={cn(
                              "mb-1 inline-block text-sm font-semibold",
                              data?.required &&
                                "after:inline-block after:pl-0.5 after:text-red-600 after:content-['*']",
                            )}
                          >
                            {data?.label}
                          </span>
                          {data?.type === "text" && (
                            <input
                              {...register(data.name)}
                              type={data.type}
                              id={data?.name}
                              name={data.name}
                              // disabled={data?.name === "categorySlug"}
                              value={category[data?.name] || ""}
                              placeholder={data.place_holder}
                              onChange={(e) => handleCateChanges(e)}
                              className="form-input w-full rounded-md border-0 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-400"
                            />
                          )}
                          {data?.type === "richtext" && (
                            <textarea
                              {...register(data.name)}
                              id={data?.name}
                              name={data.name}
                              value={category[data?.name] || ""}
                              placeholder={data.place_holder}
                              onChange={(e) => handleCateChanges(e)}
                              className="form-textarea w-full resize-none rounded-md border-0 py-3 placeholder:text-sm placeholder:text-neutral-300 focus:ring-neutral-900"
                            />
                          )}
                        </label>

                        <p
                          className={cn(
                            "hidden text-sm text-red-600",
                            errors?.[data?.name] && "block",
                          )}
                        >
                          {data?.error_message}
                        </p>
                      </div>
                    </>
                  );
                }}
              />
            </form>
          </div>
        </div>

        {subcategories?.length < 1 && (
          <EmptyStateCard
            className="mt-6 p-4"
            buttonText={"Add Subategory"}
            isDisabled={isDisabled}
            buttonElement={
              <button
                disabled={isDisabled}
                onClick={handleAddSubcategory}
                className={cn(
                  "mt-3 inline-block cursor-pointer bg-neutral-900 px-4 py-2 text-sm font-medium text-goldie-300 disabled:cursor-auto disabled:bg-neutral-200 disabled:text-neutral-400",
                )}
              >
                Add Subcategory
              </button>
            }
            handleClick={handleAddSubcategory}
            title={"No subcategories added yet"}
            buttonClassName="bg-neutral-900 text-goldie-300 text-sm"
            titleClassName="font-semibold text-xl text-center"
          />
        )}
        {subcategories.length >= 1 && (
          <div className="mt-5 border-t pt-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">Subcategories</h3>
              <button
                onClick={handleAddSubcategory}
                className={cn(
                  "inline-block cursor-pointer bg-neutral-900 px-4 py-2 text-sm font-bold text-goldie-300 disabled:bg-neutral-200 disabled:text-neutral-400 md:mt-3",
                )}
              >
                Add Subcategory
              </button>
            </div>

            {/* SUBCATEGORIES LIST FOR MOBILE */}
            <div className="grid gap-2 sm:grid-cols-2 md:hidden">
              <EachElement
                of={subcategories}
                render={(sub: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3"
                  >
                    <div className="grid grid-cols-[60px_1fr] items-center gap-2">
                      <Image
                        src={sub?.image}
                        alt={sub?.subCategoryName}
                        width={60}
                        height={50}
                        className="h-[50px] w-full object-cover object-center"
                      />
                      <div>
                        <h3 className="text-sm font-bold md:text-base">
                          {sub?.subCategoryName}
                        </h3>
                        <StatusBar status={sub?.status} className="text-xs" />
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <span
                        onClick={() => handleEdit(sub, index)}
                        className="cursor-pointer text-blue-600"
                      >
                        <Edit size={20} />
                      </span>
                      <span
                        onClick={() => handleDelete(sub)}
                        className="cursor-pointer text-red-600"
                      >
                        <Trash size={20} />
                      </span>
                    </div>
                  </div>
                )}
              />
            </div>

            {/* SUBCATEGORIES LIST FOR DESKTOP */}
            <div className="hidden md:block">
              <ProductTable
                showSearchBar={false}
                columns={columns}
                Tdata={subcategories}
                filteredTabs={[]}
              />
            </div>
          </div>
        )}
      </section>
      {showSub && (
        <CreateSubategory
          showSub={showSub}
          setShowSub={setShowSub}
          category={category?.categoryName}
          setSubcategories={setSubcategories}
          selectedSubcategory={selected}
        />
      )}

      {showModal && (
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          catOrSub={{
            sub: selected?.subCategoryName,
            isSubcategory: true,
          }}
          actionType={action}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default Page;
