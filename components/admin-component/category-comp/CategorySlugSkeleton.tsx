import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const CategorySlugSkeleton = () => {
  return (
    <div className="w-full md:grid md:grid-cols-[45%_1fr] md:items-center md:gap-5 xl:grid-cols-[450px_1fr]">
      <Skeleton className="flex h-[350px] w-full flex-col items-center justify-center rounded-md border border-dashed  px-4 py-6 " />
      <div className="mt-4 md:mt-0 md:h-min">
        <div className="md:grid md:gap-3 xl:grid-cols-2">
          <div className="mt-3 space-y-2 md:mt-0 ">
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className=" h-12 w-full rounded-md py-3" />
          </div>
          <div className="mt-3 space-y-2 md:mt-0">
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="h-8 w-full rounded-md py-3 " />
          </div>
          <div className="mt-3 space-y-2 md:mt-0 ">
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="h-24 w-full rounded-md py-3 " />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className=" h-4 w-16" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlugSkeleton;
