"use client";

import ProductCard from "@/components/shop-components/ProductCard";
import { chunkArray } from "@/helper/chunkArray";
import React, { useEffect, useState } from "react";
import useUserPdctStore from "@/zustand/userProductStore/store";
import useSavedItems from "@/services/hooks/products/useSavedItems";
import EachElement from "@/helper/EachElement";
import AdminPagination from "@/components/admin-component/AdminPagination";
import ShopPageSkeleton from "@/components/shop-components/ShopPageSkeleton";

let itemsPerPage = 6;

const Page = () => {
  const favProducts = useUserPdctStore((state) => state.favProducts);
  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(
    favProducts.length,
  );

  const [currentData, setCurrentData] = useState<any[] | null>(
    favProducts ? favProducts.slice(0, itemsPerPage) : null,
  );
  
  const startIndex =
    totalProducts === 0 ? 0 : (currentPageIndex - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalProducts);

  const { favorites, isFetching } = useSavedItems();

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  useEffect(() => {
    if (favProducts.length > 0) {
      setTotalProducts(favProducts.length);
      const favProductChunks = chunkArray(favProducts, itemsPerPage);
      setCurrentData(favProductChunks[currentPageIndex - 1]);
      setTotalPages(favProductChunks.length);
    }
  }, [currentPageIndex, favProducts]);

  return (
    <>
      <section className="wrapper pb-10">
        <div className="mt-[65px] lg:mt-20"></div>
        <div className="py-8">
          <h2 className="text-center text-2xl font-bold">Favourite Products</h2>
        </div>

        {isFetching && !currentData && <ShopPageSkeleton />}

        {!isFetching && favProducts.length === 0 ? (
          <div className="h-40 py-8">
            <p className="text-center text-lg text-gray-500">
              You have no saved products.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <span className="text-sm text-neutral-500 lg:text-base">
                Showing {startIndex} - {endIndex} of {totalProducts} results
              </span>
            </div>

            <div className="grid justify-items-end gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {currentData && (
                <EachElement
                  of={currentData}
                  render={(item: any) => (
                    <ProductCard data={item} key={item._id} />
                  )}
                />
              )}
            </div>
          </>
        )}

        {totalPages > 1 && (
          <AdminPagination
            totalPage={totalPages}
            page={currentPageIndex}
            setPage={setCurrentPageIndex}
          />
        )}
      </section>
    </>
  );
};

export default Page;
