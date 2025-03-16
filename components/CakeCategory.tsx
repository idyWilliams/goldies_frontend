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
      <div className="wrapper">
        <h2 className="text-2xl font-bold">Explore Cake Categories</h2>

        <div className="rounded-3xl py-10">
          <div className="hide-scrollbar w-full overflow-x-auto">
            <CakeCategoryData />
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href={"/shop/categories"}
              className="text-xl text-brand-200 underline underline-offset-2 sm:text-lg"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeCategory;
