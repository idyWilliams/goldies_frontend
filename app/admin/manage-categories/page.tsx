"use client";
import EmptyStateCard from "@/components/admin-component/category-comp/EmptyStateCard";
import { Edit, Information, Trash } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import cs from "../../../public/assets/milestone-cake.webp";
import kid from "../../../public/assets/kid-cake.webp";
import EachElement from "@/helper/EachElement";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/helper/cn";
import ConfirmModal from "@/components/admin-component/category-comp/ConfirmModal";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/hooks/category";

const Page = () => {
  const { data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  console.log(data);
  console.log(error);

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
  const [categories, setCategories] = useState<any[]>([
    {
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
    },
    {
      category: "Kid's Cakes",
      categorySlug: "kids-cakes",
      description:
        "Milestone cakes commemorate significant life events and achievements.",
      image: kid,
      status: "inactive",
      subcategories: [
        "Birthday Cakes",
        "Anniversary Cakes",
        "Graduation Cakes",
        "Baby Shower Cakes",
        "Retirement Cakes",
      ],
    },
  ]);
  const router = useRouter();

  const handleAddNewCategory = () => {
    router.push("/admin/manage-categories/create");
  };

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
      router.push(`/admin/manage-categories/${item.categorySlug}`);
      setShowModal(false);
    }
  };
  return (
    <>
      {/* <div className="mt-[64px]" /> */}
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 ">
          <h1 className="text-xl font-bold">Categories</h1>
          {categories?.length >= 1 && (
            <Link
              href={"/admin/manage-categories/create"}
              className="inline-block rounded-md bg-neutral-900 px-3 py-2 text-sm text-goldie-300"
            >
              New Category
            </Link>
          )}
        </div>
        {categories?.length < 1 && (
          <EmptyStateCard
            className="h-[60vh] bg-transparent"
            titleClassName="font-semibold text-center text-xl"
            buttonText={"Add Category"}
            buttonClassName="bg-neutral-900 text-goldie-300"
            handleClick={handleAddNewCategory}
            title={"No categories added yet"}
          />
        )}

        {categories?.length >= 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <EachElement
              of={categories}
              render={(item: any, index: number) => (
                <div key={index} className="rounded-md bg-white p-4">
                  <div className="grid  items-center gap-2 sm:grid-cols-[150px_1fr]">
                    <Image
                      src={item.image}
                      alt={item.category}
                      className="h-full w-full rounded-md object-cover object-center"
                    />
                    <div className="py-1.5">
                      <div className="mb-1 flex items-center justify-between">
                        <StatusBar status={item?.status} />
                        <div className="inline-flex items-center gap-3">
                          <span
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer text-blue-600 hover:text-blue-400"
                          >
                            <Edit size={24} />
                          </span>
                          <span
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-600 hover:text-red-400"
                          >
                            <Trash size={24} />
                          </span>
                        </div>
                      </div>
                      <h3 className="">
                        <span className="font-semibold">Category:&nbsp;</span>
                        {item.category}
                      </h3>
                      <p className="mt-1">
                        <span className="font-semibold">
                          Description:&nbsp;
                        </span>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">Subcategories</h3>
                    <div className="flex flex-wrap gap-2">
                      <EachElement
                        of={item?.subcategories}
                        render={(sub: string, index: number) => (
                          <span
                            key={index}
                            className="inline-block rounded-md bg-goldie-300 p-2 px-2.5 text-sm capitalize text-neutral-900 xl:text-base"
                          >
                            {sub}
                          </span>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </section>
      {showModal && (
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          catOrSub={{
            cat: selected?.category, // Category name
            isCategory: true,
            sub: undefined,
            isSubcategory: undefined,
          }}
          actionType={action}
          handleConfirm={() => handleConfirm(selected)}
        />
      )}
    </>
  );
};

export default Page;
// interface MgCategory {
//   category: string;
//   categorySlug: string;
//   description: string;
//   image: StaticImageData;
//   status: string;
//   subcategories: string[];
// }

// export const mgCategory: MgCategory[] = [
// {
//   category: "Milestone Cakes",
//   categorySlug: "milestone-cakes",
//   description:
//     "Milestone cakes commemorate significant life events and achievements.",
//   image: cs,
//   status: "active",
//   subcategories: [
//     "Birthday Cakes",
//     "Anniversary Cakes",
//     "Graduation Cakes",
//     "Baby Shower Cakes",
//     "Retirement Cakes",
//   ],
// },
// {
//   category: "Kid's Cakes",
//   categorySlug: "kids-cakes",
//   description:
//     "Milestone cakes commemorate significant life events and achievements.",
//   image: kid,
//   status: "inactive",
//   subcategories: [
//     "Birthday Cakes",
//     "Anniversary Cakes",
//     "Graduation Cakes",
//     "Baby Shower Cakes",
//     "Retirement Cakes",
//   ],
// },
// ];
