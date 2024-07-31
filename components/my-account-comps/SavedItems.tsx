import { cn } from "@/helper/cn";
import { getOrderColor } from "@/helper/getOrderColor";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import { chunkArray } from "@/helper/chunkArray";
import Image from "next/image";
import img from "../../public/assets/banana-cake-with-cinnamon-cream-102945-1.jpeg";
import { addSlugToCakes } from "@/helper";
import { savedItems } from "@/utils/cakeData";
import Link from "next/link";
import ProductCard from "../shop-components/ProductCard";

let itemsPerPage = 6;
const SavedItems = () => {
  const [cakes, setCakes] = useState<any[]>(addSlugToCakes(savedItems));
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  useEffect(() => {
    setCakes((prev: any) => prev.filter((item: any) => item?.id > 5));
  }, []);

  return (
    <div>
      <div className="mb-4 border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-semibold">Saved Items</h2>
        <p>
          Quickly access and manage your favorite items for easy shopping later.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {chunkArray(cakes, itemsPerPage)[currentPageIndex - 1]?.map(
          (cake: any, index: any) => {
            return <ProductCard data={cake} key={index} />;
          },
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
