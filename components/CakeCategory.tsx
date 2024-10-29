import Link from "next/link";
// import EachElement from "@/helper/EachElement";
// import { Button } from "./ui/button";
// import Placeholder from "../public/assets/placeholder3.png";
// import { getPaginatedCategories } from "@/services/hooks/category";

// import getApiResponse from "@/helper/getApiResponse";
import CakeCategoryData from "./CakeCategoryData";

const CakeCategory = () => {
  return (
    <section className="py-10">
      {/* HEADIng */}
      <div className="wrapper flex items-center gap-5">
        <h2 className="text-2xl font-bold">Explore Cake Categories</h2>
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
          <span className="absolute left-2 top-[7.5px] -z-[1] h-0.5 w-[40px] bg-black"></span>
        </div>
      </div>

      <div className="vector-bg mt-7 rounded-3xl border bg-cover bg-center py-10">
        <div className="hide-scrollbar w-full overflow-x-auto">
          <CakeCategoryData />
        </div>

        <div className="wrapper mt-8 flex justify-end">
          <Link
            href={"/shop/categories"}
            className="text-xl underline underline-offset-2 sm:text-lg"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CakeCategory;
