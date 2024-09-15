import React from "react";
import CategoriesSkeleton from "../CategorySkeleton";

const ManageCategoriesSkeleton = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <CategoriesSkeleton />
      <CategoriesSkeleton />
      <CategoriesSkeleton />
      <CategoriesSkeleton />
    </div>
  );
};

export default ManageCategoriesSkeleton;
