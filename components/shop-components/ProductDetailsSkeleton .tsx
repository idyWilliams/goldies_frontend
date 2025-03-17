import { Skeleton } from "@/components/ui/skeleton";
import BreadCrumbs from "../BreadCrumbs";

const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className="bg-black py-4">
        <div className="wrapper">
          <BreadCrumbs
            items={[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "Shop",
                link: "/shop",
              },
              // {
              //   name: activeProduct ? activeProduct.name : "",
              //   link: "/shop/cakes",
              // },
            ]}
          />
        </div>
      </div>
      <div className="wrapper py-12">
        <div className="grid grid-cols-1 gap-4 md:items-start lg:grid-cols-2 lg:justify-evenly lg:gap-8 xl:grid-cols-[40%_50%] xl:gap-10">
          {/* Image Skeleton */}
          <div className="relative w-full">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>

          {/* Details Skeleton */}
          <div className="mb-1 flex flex-col text-lg">
            <Skeleton className="mb-2 h-6 w-1/2" />
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-4 h-6 w-1/3" />

            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Form Skeleton */}
            <div className="mt-4 space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>

            {/* Quantity and Buttons Skeleton */}
            <div className="my-3">
              <Skeleton className="h-10 w-1/2" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
