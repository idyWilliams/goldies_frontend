import React from "react";
import CategoriesSkeleton from "../CategorySkeleton";

const ManageCategoriesSkeleton = () => {
  return (
    <>
      <div className="hidden gap-5 md:grid-cols-2 lg:grid">
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
      </div>
      <div className="hidden gap-5 md:grid md:grid-cols-2 lg:hidden">
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
      </div>
      <div className="grid gap-5 md:hidden ">
        <CategoriesSkeleton />
        <CategoriesSkeleton />
        <CategoriesSkeleton />
      </div>
    </>
  );
};

export default ManageCategoriesSkeleton;
