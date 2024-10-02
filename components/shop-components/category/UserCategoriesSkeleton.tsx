import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/assets/goldis-gold-logo.png";
import EachElement from "@/helper/EachElement";

const UserCategoriesSkeleton = () => {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      <EachElement
        of={new Array(4).fill(null)}
        render={(item: any, index: number) => (
          <div className=" relative h-[270px] w-full bg-neutral-100 xl:h-[300px]">
            <Skeleton className="absolute left-0 top-0 h-full w-full rounded-none " />
          </div>
        )}
      />
    </div>
  );
};

export default UserCategoriesSkeleton;
