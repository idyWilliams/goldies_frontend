import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SubCategoriesSkeleton = () => {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-3 w-24 rounded-sm" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
      <Skeleton className="mb-4 flex h-14 w-full items-center justify-between rounded-none" />
      <div className="flex items-center justify-between gap-12 px-4">
        <Skeleton className=" h-[100px] w-[100px] rounded-none" />
        <Skeleton className="h-3 w-28 rounded-sm" />
        <Skeleton className="h-3 flex-1 rounded-sm" />

        <Skeleton className="h-8 w-24 rounded-full" />
        <div className="inline-flex justify-between gap-3">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
    </>
  );
};

export default SubCategoriesSkeleton;
