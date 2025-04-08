import EachElement from "@/helper/EachElement";
import { handleImageLoad } from "@/helper/handleImageLoad";
import Image from "next/image";
import React, { useState } from "react";
import StatusBar from "./StatusBar";
import Placeholder from "@/public/assets/placeholder3.png";
import { CloseSquare, Edit, Trash } from "iconsax-react";
import { Category } from "@/services/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CategoriesCardsPropTypes = {
  currentData: Category[];
  handleEdit: (item: Category) => void;
  handleDelete: (item: Category) => void;
};

const CategoriesCards = ({
  currentData,
  handleEdit,
  handleDelete,
}: CategoriesCardsPropTypes) => {
  const [isLoaded, setIsLoaded] = useState<{ [key: string]: boolean }>({});
  const [selectedDescription, setSelectedDescription] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const maxDescriptionLength = 100;

  const truncateDescription = (description?: string) => {
    if (!description) return "";
    return description.length > maxDescriptionLength
      ? `${description.substring(0, maxDescriptionLength)}...`
      : description;
  };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <EachElement
        of={currentData}
        render={(item: any) => (
          <div key={item._id} className="rounded-md bg-white p-4">
            <div className=" grid items-center gap-2 sm:grid-cols-[150px_1fr]">
              <div className="relative h-[150px]">
                {!isLoaded[item._id] && (
                  <Image
                    src={Placeholder}
                    alt="placeholder"
                    placeholder="blur"
                    priority
                    fill
                    sizes="(max-width: 1440px) 33vw"
                    className="absolute left-0 top-0 animate-pulse rounded-md object-cover"
                  />
                )}

                <Image
                  src={item?.image}
                  alt={item?.name}
                  fill
                  sizes="(max-width: 1440px) 33vw"
                  className={`rounded-md object-cover object-center ${isLoaded[item._id] ? "opacity-100" : "opacity-0"} `}
                  onLoad={() => handleImageLoad(item._id, setIsLoaded)}
                />
              </div>
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
                  {item?.name}
                </h3>
                <div className="mt-1">
                  <span className="font-semibold">Description:&nbsp;</span>
                  <div className="inline">
                    <p className="line-clamp-2">{truncateDescription(item?.description)}</p>
                    {item?.description &&
                      item.description.length > maxDescriptionLength && (
                        <button
                          onClick={() =>
                            setSelectedDescription({
                              name: item.name,
                              description: item.description,
                            })
                          }
                          className="ml-1 text-sm text-blue-500 hover:underline"
                        >
                          See more
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Products ({item?.productCount})</h3>
              <h3 className="font-semibold">Subcategories ({item?.subCategoryCount})</h3>
              {!item?.subCategories ||
                (item?.subCategories?.length < 1 && (
                  <p>There are no subcategories </p>
                ))}
              {item?.subCategories?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item?.subCategories && (
                    <EachElement
                      of={item?.subCategories}
                      render={(subcategory: any, index: number) => {
                        if (index > 5) return;
                        return (
                          <span
                            key={index}
                            className="inline-block rounded-md bg-brand-200 p-2 px-2.5 text-sm capitalize text-brand-100 xl:text-base"
                          >
                            {subcategory.name}
                          </span>
                        );
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      />

      {/* Description Dialog */}
      <Dialog
        open={!!selectedDescription}
        onOpenChange={(open) => !open && setSelectedDescription(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDescription?.name}</DialogTitle>

            <span
              className="absolute right-2 top-0 z-10 cursor-pointer bg-white"
              onClick={() => setSelectedDescription(null)}
            >
              <CloseSquare size={24} />
            </span>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <p className="whitespace-pre-wrap">
              {selectedDescription?.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesCards;
