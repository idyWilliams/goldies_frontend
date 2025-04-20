import EachElement from "@/helper/EachElement";
import { IProduct, ProductParams } from "@/interfaces/product.interface";
import useProducts from "@/services/hooks/products/useProducts";
import useSavedItems from "@/services/hooks/products/useSavedItems";
import useUserPdctStore from "@/zustand/userProductStore/store";
import Link from "next/link";
import { useEffect } from "react";
import ProductCard from "./shop-components/ProductCard";
import ProductCardSkeleton from "./shop-components/ProductCardSkeleton";
import ShopPageSkeleton from "./shop-components/ShopPageSkeleton";

const FeaturedProducts = () => {
  const favProducts = useUserPdctStore((state) => state.favProducts);
  const setFavProducts = useUserPdctStore((state) => state.setFavProducts);
  // const featuredProducts = useUserPdctStore((state) => state.allProducts);

  const params: ProductParams = {
    page: 1,
    limit: 6,
  };

  const { isPending, products: featuredProducts } = useProducts(params);
  const { favorites } = useSavedItems();

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  return (
    <>
      <section className="py-10">
        <div className="wrapper">
          <h2 className="text-3xl font-semibold text-brand-200">
            Popular Products
          </h2>
          <div className="py-10">
            {isPending && !featuredProducts && (
              <div className="">
                <ShopPageSkeleton />
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3  xl:gap-7">
              {isPending ? (
                [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
              ) : featuredProducts.length > 0 ? (
                <EachElement
                  of={featuredProducts}
                  render={(cake: IProduct, index: any) => {
                    if (index > 5) return;
                    return <ProductCard data={cake} key={index} />;
                  }}
                />
              ) : (
                <div></div>
              )}
            </div>
            <div className="mt-8 flex justify-end">
              <Link
                href={"/shop"}
                className="text-xl text-brand-200 underline underline-offset-2 sm:text-lg"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
