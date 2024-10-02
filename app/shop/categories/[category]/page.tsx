"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import EachElement from "@/helper/EachElement";
import { getCategoryUser } from "@/services/hooks/category";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/goldis-gold-logo.png";
import UserCategorySkeleton from "@/components/shop-components/category/UserCategorySkeleton";

type CategoryType = {
  [x: string]: any;
  image?: "";
  description?: "";
  _id?: "";
};

const Page = ({ params }: any) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id") || "";
  const catStatus = searchParams.get("status");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCatLoaded, setisCatLoaded] = useState<boolean>(false);

  const [category, setCategory] = useState<CategoryType | null>(null);

  const { data, status, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryUser(categoryId),
    enabled: !!categoryId && catStatus === "true",
  });

  useEffect(() => {
    if (status === "success") {
      console.log(data);
      setCategory(data?.category);
    }
  }, [status, data]);

  return (
    <Layout>
      <div className="mt-[65px] bg-neutral-900 py-3 lg:mt-[80px]">
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
              {
                name: "Categories",
                link: "/shop/categories",
              },
              {
                name: category?.label,
                link: "",
              },
            ]}
          />
        </div>
      </div>
      {isLoading && <UserCategorySkeleton />}
      {status === "success" && category && (
        <>
          <div className="wrapper relative mx-auto h-[200px] w-full py-6 md:my-[16px] md:w-[calc(100%_-_30px)]">
            <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-center bg-gradient-to-r from-[#221b0fee] to-[rgba(17,17,17,0.8)] px-4 ">
              <h1 className="text-2xl font-semibold text-goldie-300 md:text-3xl lg:text-5xl">
                {category?.name}
              </h1>
              <p className="text-[#f8eeb9]">{category?.description}</p>
            </div>

            {!isCatLoaded && (
              <Image
                src={Logo}
                alt="placeholder"
                placeholder="blur"
                priority
                fill
                className="absolute left-0 top-0 object-cover"
              />
            )}
            <Image
              src={category?.image || ""}
              alt={category?.name}
              fill
              priority
              className={`absolute left-0 top-0 object-cover object-center ${isCatLoaded ? "opacity-100" : "opacity-0"} `}
              onLoad={() => setisCatLoaded(true)}
            />
          </div>

          <div className="wrapper grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:px-[2%]">
            <EachElement
              of={category?.subCategories}
              render={(sub: any, index: number) => {
                if (!sub.status) return;
                return (
                  <div
                    key={index}
                    className=" relative h-[270px] w-full bg-neutral-100 xl:h-[300px]"
                  >
                    <figure className="relative z-10 mx-auto flex h-full w-11/12 items-end pb-3 xl:pb-3">
                      <div className="box-border flex min-h-[180px] w-full flex-col items-start justify-between bg-black bg-opacity-40 p-4 text-white backdrop-blur-sm  ">
                        <div className="o w-full grow">
                          <h3 className="text-xl font-bold">{sub?.name}</h3>
                          <p className="line-clamp-3 w-full break-all   text-sm">
                            {sub?.description}
                          </p>
                        </div>
                        <Link
                          href={`/shop?cat=${encodeURIComponent(category?.name?.toLowerCase())}&sub=${encodeURIComponent(sub?.name?.toLowerCase())}`}
                          className=" mt-3 block w-full rounded-md bg-goldie-300 p-2  text-center text-neutral-900 xl:p-3"
                        >
                          Buy now
                        </Link>
                      </div>
                    </figure>
                    {!isLoaded && (
                      <Image
                        src={Logo}
                        alt="placeholder"
                        placeholder="blur"
                        fill
                        className="absolute left-0 top-0 object-cover"
                      />
                    )}
                    <Image
                      src={sub?.image || ""}
                      alt={sub?.name}
                      fill
                      className={`absolute left-0 top-0 object-cover ${isLoaded ? "opacity-100" : "opacity-0"} `}
                      onLoad={() => setIsLoaded(true)}
                    />
                  </div>
                );
              }}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Page;
