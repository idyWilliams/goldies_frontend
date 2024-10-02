import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SubCategoriesSkeleton = () => {
  return (
    <div className="mt-5 border-t pt-5">
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-3 w-24 rounded-sm" />
        <Skeleton className="h-9 w-36 rounded-md" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2 md:hidden">
        <div className="flex items-center justify-between p-3">
          <div className="grid grid-cols-[60px_1fr] items-center gap-2">
            <Skeleton className="h-[50px] w-full rounded-none" />
            <div>
              <Skeleton className="mb-2 h-3 w-[69px] rounded-sm" />
              <Skeleton className="h-5 w-[69px] rounded-full" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center justify-between p-3">
          <div className="grid grid-cols-[60px_1fr] items-center gap-2">
            <Skeleton className="h-[50px] w-full rounded-none" />
            <div>
              <Skeleton className="mb-2 h-3 w-[69px] rounded-sm" />
              <Skeleton className="h-5 w-[69px] rounded-full" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="hidden md:block">
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
        </div>{" "}
      </div>
    </div>
  );
};

export default SubCategoriesSkeleton;
