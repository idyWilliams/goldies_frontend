import React from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ShopPageSkeleton = () => {
  return (
    <>
      <div className="hidden gap-5 lg:grid lg:grid-cols-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
      <div className=" md:hidden">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </>
  );
};

export default ShopPageSkeleton;
