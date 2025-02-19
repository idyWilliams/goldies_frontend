import { addSlugToCakes } from "@/helper";
import EachElement from "@/helper/EachElement";
import useSavedItems from "@/services/hooks/products/useSavedItems";
import useUserPdctStore from "@/zustand/userProductStore/store";
import Link from "next/link";
import { useEffect } from "react";
import ProductCard from "../shop-components/ProductCard";

let itemsPerPage = 2;
const SavedItems = () => {
  const { favProducts, setFavProducts } = useUserPdctStore();
  const { favorites, isFetching } = useSavedItems();

  useEffect(() => {
    if (favorites) {
      setFavProducts(favorites);
    }
  }, [favorites, setFavProducts]);

  return (
    <div>
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">Saved Items</h2>
        <p>
          Quickly access and manage your favorite items for easy shopping later.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {/* {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
          (cake: any, index: any) => {
            return <ProductCard data={cake} key={index} />;
          },
        )} */}

        {!isFetching && favProducts.length === 0 ? (
          <div className="h-40 py-8">
            <p className="text-center text-lg text-gray-500">
              You have no saved products.
            </p>
          </div>
        ) : (
          favProducts && (
            <EachElement
              of={addSlugToCakes(favProducts)}
              render={(item: any, index: number) => {
                if (index > 1) return;
                return <ProductCard data={item} key={item._id} />;
              }}
            />
          )
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href={"/saved-items"} className="font-bold uppercase underline">
          See all
        </Link>
      </div>
    </div>
  );
};

export default SavedItems;
