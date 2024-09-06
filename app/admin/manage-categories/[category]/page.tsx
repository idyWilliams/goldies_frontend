"use client";
import ProductTable from "@/components/admin-component/ProductTable";
import CreateSubategory from "@/components/admin-component/category-comp/CreateSubcategory";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit, Trash } from "iconsax-react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toggle/style.css";
import * as yup from "yup";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { CategoryPageProps, CategoryProps } from "@/utils/categoryTypes";
import { columns } from "@/components/admin-component/category-comp/SubcategoriesTable";
import ConfirmModal from "@/components/admin-component/category-comp/ConfirmModal";
import { selectedCategory, subcategoriesArray } from "@/utils/cakeCategories";
import CategoryHeader from "@/components/admin-component/category-comp/CategoryHeader";
import CategoryForm from "@/components/admin-component/category-comp/CategoryForm";
import useCategoriesStore from "@/zustand/store";

const schema = yup.object().shape({
  categoryName: yup.string().required("Subcategory name is required"),
  categorySlug: yup.string().required("Subcategory slug is required"),
  description: yup.string().required("Subcategory description is required"),
});

const Page = ({ params }: CategoryPageProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  console.log(categoryId);
  // const getCategoryById = useCategoriesStore((state) => state.getCategoryById);
  // const editCategory = getCategoryById(categoryId);
  // console.log(editCategory);

  const [selected, setSelected] = useState<any>(selectedCategory);
  const [category, setCategory] = useState<CategoryProps>({
    categoryName: "",
    categorySlug: "",
    description: "",
    image: "",
    status: true,
  });
  const [subcategories, setSubcategories] = useState<any[]>(subcategoriesArray);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isNewCreate = pathname.endsWith("/create");
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

  const handleAddSubcategory = () => {
    setShowSub(true);
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
      image: null,
      status: true,
    });
    setCategory({
      categoryName: "Milestone Cakes",
      categorySlug: "milestone-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
      image: null,
      status: true,
    });
  }, [reset]);

  return (
    <>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <CategoryHeader formRef={formRef} loading={loading} />

        <CategoryForm formRef={formRef} setLoading={setLoading} />

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
                  "mt-3 inline-block cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-goldie-300 disabled:cursor-auto disabled:bg-neutral-200 disabled:text-neutral-400",
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
                  "inline-block cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-goldie-300 disabled:bg-neutral-200 disabled:text-neutral-400 md:mt-3",
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
