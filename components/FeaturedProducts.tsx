import Link from "next/link";
import EachElement from "@/helper/EachElement";
import { addSlugToCakes } from "@/helper";
import { cakeProducts1 } from "@/utils/cakeData";
import ProductCard from "./shop-components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/hooks/products";
import { useEffect, useMemo } from "react";
import ShopPageSkeleton from "./shop-components/ShopPageSkeleton";
import useSavedItems from "@/services/hooks/products/useSavedItems";
import useUserPdctStore from "@/zustand/userProductStore/store";

const FeaturedProducts = () => {
  const favProducts = useUserPdctStore((state) => state.favProducts);
  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ["allProducts", 1, 6],
    queryFn: async () => getAllProducts(1, 6),
  });

  const featuredProducts = useMemo(() => {
    if (isLoading || isError) return null;
    else return data?.products;
  }, [isError, isLoading, data?.products]);

  const { favorites } = useSavedItems();

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  return (
    <>
      <section className="py-10">
        <div className="wrapper flex items-center gap-5">
          <h2 className="text-2xl font-bold">Popular Products</h2>
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,15 90,85 10,85"
                fill="black"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="absolute left-2 top-[7.5px] -z-[1] h-0.5 w-[40px] bg-black "></span>
          </div>
        </div>

        <div className="vector-bg mt-7 rounded-3xl border bg-cover bg-center py-10">
          <div className="wrapper grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7 ">
            {isPending && !featuredProducts && <ShopPageSkeleton />}
            {featuredProducts && (
              <EachElement
                of={addSlugToCakes(featuredProducts)}
                render={(cake: any, index: any) => {
                  if (index > 5) return;
                  return <ProductCard data={cake} key={index} />;
                }}
              />
            )}
          </div>
          <div className="wrapper mt-8 flex justify-end">
            <Link
              href={"/shop"}
              className="text-xl underline underline-offset-2 sm:text-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
