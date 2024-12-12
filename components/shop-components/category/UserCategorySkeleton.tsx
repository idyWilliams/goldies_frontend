import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Logo from "@/public/assets/goldis-gold-logo.png";
import EachElement from "@/helper/EachElement";

const UserCategorySkeleton = () => {
  return (
    <>
      <div className="wrapper relative mx-auto h-[200px] w-full  py-6 md:my-[16px] md:w-[calc(100%_-_30px)]">
        <Skeleton className="absolute left-0 top-0 h-full w-full rounded-none " />
      </div>
      <div className="wrapper grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:px-[2%]">
        <EachElement
          of={new Array(3).fill(null)}
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

export default UserCategorySkeleton;
