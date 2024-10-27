import { Skeleton } from "@/components/ui/skeleton";

import React from "react";
import EachElement from "@/helper/EachElement";

const UserCategoriesSkeleton = () => {
  return (
    <>
      <div className=" mt-5  hidden gap-4  xl:grid xl:grid-cols-4">
        <EachElement
          of={new Array(8).fill(null)}
          render={(item: any, index: number) => (
            <div className=" relative  w-full bg-neutral-100 xl:h-[300px]">
              <Skeleton className="absolute left-0 top-0 h-full w-full rounded-none " />
            </div>
          )}
        />
      </div>
      <div className="mt-5 hidden gap-4 lg:grid lg:grid-cols-3 xl:hidden">
        <EachElement
          of={new Array(6).fill(null)}
          render={(item: any, index: number) => (
            <div className=" relative h-[270px] w-full bg-neutral-100">
              <Skeleton className="absolute left-0 top-0 h-full w-full rounded-none " />
            </div>
          )}
        />
      </div>
      <div className="mt-5 hidden gap-4 sm:grid sm:grid-cols-2 md:gap-6 lg:hidden ">
        <EachElement
          of={new Array(4).fill(null)}
          render={(item: any, index: number) => (
            <div className=" relative h-[270px] w-full bg-neutral-100 ">
              <Skeleton className="absolute left-0 top-0 h-full w-full rounded-none " />
            </div>
          )}
        />
      </div>
      <div className="mt-5 flex flex-col gap-4 sm:hidden">
        <EachElement
          of={new Array(2).fill(null)}
          render={(item: any, index: number) => (
            <div className=" relative h-[270px] w-full bg-neutral-100 xl:h-[300px]">
              <Skeleton className="absolute left-0 top-0 h-full w-full rounded-none " />
            </div>
          )}
        />
      </div>
    </>
  );
};

export default UserCategoriesSkeleton;
