"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/helper/formatCurrency";
import { IProduct } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import coconut from "@/public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import { getProduct } from "@/services/hooks/products";
import { useQuery } from "@tanstack/react-query";
import { Edit, Refresh } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }: { params: { details: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();

  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["product", params.details],
    queryFn: async () => getProduct(params.details),
  });

  const product = data?.productDetails as IProduct;

  if (isPending)
    return (
      <section className="p-5">
        <div className="flex justify-between">
          <div className="w-1/2">
            <Skeleton className="mb-2 h-6 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[55%_1fr]">
          {/* Left Skeleton */}
          <div className="rounded-md bg-white p-6">
            <Skeleton className="mb-4 h-6 w-40" />
            <div className="bg-white p-6">
              <Skeleton className="mb-4 h-5 w-40" />
              <Skeleton className="mb-4 h-5 w-full" />
              <Skeleton className="mb-4 h-5 w-40" />
              <Skeleton className="mb-4 h-5 w-60" />
              <Skeleton className="mb-4 h-5 w-40" />
              <Skeleton className="mb-4 h-5 w-32" />
            </div>
          </div>

          {/* Right Skeleton - Images */}
          <div className="rounded-md bg-white p-6">
            <Skeleton className="mb-4 h-6 w-40" />
            <div className="bg-white p-6">
              <Skeleton className="mb-6 h-[300px] w-full" />
              <div className="grid grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[80px] w-[80px]" />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  if (isError) {
    return (
      <section className="flex h-[50vh] flex-col items-center justify-center p-5">
        <h1 className="text-xl font-semibold text-red-600">
          Failed to load product details
        </h1>
        <p className="text-neutral-500">
          An error occurred while fetching data.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-4 flex items-center gap-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <Refresh size={20} />
          Retry
        </Button>
      </section>
    );
  }

  const formatText = (text: string) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section className="">
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex items-start gap-2">
            <div className="">
              <h1 className="text-lg font-semibold uppercase">
                Product Details
              </h1>
              <ul className="inline-flex items-center">
                <Link href="/admin/products" className="hover:underline">
                  <ol className="mr-1">Products </ol>
                </Link>
                /
                <ol className="pl-1 capitalize text-neutral-500">
                  {product?.name}
                </ol>
              </ul>
            </div>
          </div>
          <Button
            className="mb-2 gap-2 rounded-md text-goldie-300"
            onClick={() =>
              router.push(`/admin/create-products?edit=${product?._id}`)
            }
          >
            <Edit size={20} />
            <span>Edit</span>
          </Button>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[55%_1fr]">
          <div className="rounded-md bg-black">
            <h1 className="px-6 pb-4 pt-6 font-semibold text-goldie-300">
              Product Information
            </h1>
            <div className="bg-white px-6 py-3">
              <div className="mb-5">
                <p className="font-semibold capitalize">product name:</p>
                <p className="capitalize">{product?.name}</p>
              </div>
              <div className="mb-5">
                <p className="font-semibold">Product Description:</p>
                <p>{product?.description}</p>
              </div>
              <div className="mb-5 flex flex-wrap items-center justify-between">
                <div className="mb-5">
                  <p className="font-semibold">Product Price:</p>
                  <p>
                    {formatCurrency(parseInt(product?.minPrice!), "en-NG")} -{" "}
                    {formatCurrency(parseInt(product?.maxPrice!), "en-NG")}
                  </p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Product Code:</p>
                  <p className="uppercase">{product?.productCode}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Product Category:</p>
                  <p>{product?.category?.name}</p>
                </div>
                <div className="mb-5">
                  <p className="font-semibold">Subcategory:</p>
                  <p>
                    {product?.subCategories
                      ?.map((item) => item?.name)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Sizes:</p>
                <p className="capitalize">
                  {product?.sizes?.map((item: any) => item).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Shapes:</p>
                <p className="capitalize">
                  {product?.shapes?.map((item: any) => item).join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">Product Fillings:</p>
                <p className="capitalize">
                  {product?.toppings
                    ?.map((item: string) => formatText(item))
                    .join(", ")}
                </p>
              </div>
              <div className="mb-5">
                <p className="font-semibold capitalize">
                  Toppings &amp; Addons:
                </p>
                <p className="capitalize">
                  {product?.toppings
                    ?.map((item: string) => formatText(item))
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className="h-fit rounded-md bg-black">
            <h1 className="px-6 pb-4 pt-6 font-semibold text-goldie-300">
              Product Images
            </h1>
            <div className="bg-white px-6 py-6">
              <div className="">
                <div className="mb-6 h-[300px] w-full">
                  <Image
                    src={product?.images[selectedImage] || coconut}
                    alt="Coconut Cake"
                    width={250}
                    height={250}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap items-center">
                  {product?.images.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={cn(
                        "h-[80px] w-[80px] shrink-0 cursor-pointer overflow-hidden border-4 border-transparent",
                        selectedImage === index && "border-goldie-300",
                      )}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={item}
                        alt={`cake-${index + 1}`}
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
