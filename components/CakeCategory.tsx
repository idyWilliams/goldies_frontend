"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EachElement from "@/helper/EachElement";
import { categories } from "@/utils/cakeCategories";
import { Button } from "./ui/button";
import Logo from "../public/assets/goldis-gold-logo.png";
import { getPaginatedCategories } from "@/services/hooks/category";
import { useQuery } from "@tanstack/react-query";

type AllCategoriesType = {
  [x: string]: any;
  image?: "";
  description?: "";
  _id: "";
};

const CakeCategory = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCategories, setAllCategories] = useState<
    AllCategoriesType[] | null
  >([]);

  const { data, status } = useQuery({
    queryKey: ["categories", 1, 3],
    queryFn: async () => getPaginatedCategories(1, 3),
  });

  useEffect(() => {
    if (status === "success") {
      setAllCategories(data.categories);
    }
  }, [status, data]);

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
          <div className="wrapper w-full gap-3 space-y-5 sm:flex sm:w-min sm:grid-cols-2 sm:space-x-5 sm:space-y-0 lg:grid lg:w-full lg:grid-cols-3 lg:space-x-0 xl:gap-7">
            {status === "pending" && (
              <>
                <EachElement
                  of={new Array(3).fill(null)}
                  render={(item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="relative flex h-[300px] items-end bg-goldie-50  sm:w-[300px] lg:w-full"
                      >
                        <Image
                          src={Logo}
                          alt="placeholder for image"
                          fill
                          sizes="(max-width: 1024px) 33vw"
                          priority
                          placeholder="blur"
                          className="absolute left-0 top-0 p-4"
                        />
                      </div>
                    );
                  }}
                />
              </>
            )}

            {status === "success" && allCategories && (
              <EachElement
                of={allCategories}
                render={(cake: any, index: any) => {
                  if (index > 2) return;
                  return (
                    <div className="relative flex h-[300px] items-end sm:w-[300px] lg:w-full">
                      {!isLoaded && (
                        <Image
                          src={Logo}
                          alt="placeholder for image"
                          placeholder="blur"
                          sizes="(max-width: 1024px) 33vw"
                          priority
                          fill
                          className="absolute left-0 top-0 bg-goldie-50 p-4"
                        />
                      )}

                      <Image
                        src={cake?.image ?? ""}
                        alt={cake?.name}
                        fill
                        sizes="(max-width: 1024px) 33vw"
                        className={`absolute left-0 top-0 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setIsLoaded(true)}
                      />

                      <div className=" bg-black bg-opacity-10 p-4 backdrop-blur-md">
                        <h3 className="font-bold text-white">
                          {cake?.name || ""}
                        </h3>
                        <p className="text-white">{cake?.description || ""}</p>
                        <Button className="mt-4 h-auto w-full bg-goldie-300 text-black">
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </div>
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
