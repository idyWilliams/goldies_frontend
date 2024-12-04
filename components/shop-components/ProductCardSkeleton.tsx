import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full rounded-[10px] border border-neutral-100 bg-white p-2 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)]">
      <Skeleton className="relative mb-3 h-[230px] w-full overflow-hidden rounded-[5px]" />

      <div className="mb-3 flex flex-col space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="mb-3 w-full space-y-2 pr-8">
        <Skeleton className="  h-4 w-full " />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="mb-2 h-[15px] w-40" />
      <Skeleton className="h-11 w-full" />
    </Card>
  );
};

export default ProductCardSkeleton;
