import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import React from "react";

export default function CategorySkeleton() {
  return (
    <Card className="w-full rounded-md p-4">
      <CardContent className=" grid items-center gap-2 p-0 sm:grid-cols-[150px_1fr]">
        <Skeleton className=" h-[150px] w-[150px] rounded-md" />

        <div className="py-1.5">
          <div className="mb-1 flex items-center justify-between">
            <Skeleton className="h-8 w-[100px] rounded-full" />
            <div className="inline-flex items-center gap-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
          <div className="w-full pr-5">
            <Skeleton className="mt-3 block h-4 max-w-[50%] " />
            <Skeleton className="mb-4 mt-1 block h-4 max-w-[80%] " />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col items-start space-y-2 p-0">
        <Skeleton className="h-4 w-40" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
}
