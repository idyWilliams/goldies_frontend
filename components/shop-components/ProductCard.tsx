import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { addProductToCart } from "@/redux/features/product/productSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/helper/cn";
import { Tooltip } from "react-tooltip";
import StarRating from "../StarRating";
import Placeholder from "@/public/assets/placeholder3.png";
import useUserPdctStore from "@/zustand/userProductStore/store";
import Favorite from "./Favorite";

const exampleImage =
  "https://firebasestorage.googleapis.com/v0/b/goldie-b3ba7.appspot.com/o/products%2Fbanana-cake-with-cinnamon-cream-102945-1.webp?alt=media&token=32e645da-9327-4f7f-9f79-a2cba1102676";

const ProductCard = React.memo(function ProductCard({ data }: { data: any }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product?.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fav, setFav] = useState(false);
  const favProducts = useUserPdctStore((state) => state.favProducts);
  const setActiveProduct = useUserPdctStore((state) => state.setActiveProduct);
  const productId = data._id;
  // console.log(productId);
  // console.log(data);

  // useEffect(() => {
  //   const found = favProducts.find((favProduct) => favProduct._id === data._id);
  //   if (found) {
  //     console.log(found);

  //     setFav(true);
  //   } else {
  //     console.log(fav);

  //     setFav(false);
  //   }
  // }, [favProducts, data._id, fav]);

  const handleAddToCart = () => {
    const items = Object.values(cart);

    dispatch(addProductToCart({ id: data.id }));

    localStorage.getItem("cart");
    console.log(data.id, cart);
    // setShapes(null)
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleProduct = (prod: any) => {
    setActiveProduct(prod);
  };

  return (
    <div className="w-full rounded-[10px] border border-neutral-100 bg-white p-2 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)]">
      <figure className="relative mb-3 h-[230px] w-full overflow-hidden rounded-[5px]">
        <Link
          href={`/shop/${data?.slug}?productId=${productId}`}
          className="relative inline-block h-full w-full overflow-hidden"
          onClick={() => handleProduct(data)}
        >
          {!isLoaded && (
            <Image
              src={Placeholder}
              alt="placeholder for image"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 33vw"
              className="animate-pulse object-cover object-center"
            />
          )}

          <Image
            src={
              data.images[0].includes("example") ? exampleImage : data.images[0]
            }
            // src={data?.imageUrl ? data?.imageUrl : data.images[0]}
            alt={data?.name}
            fill
            sizes="(max-width: 1440px) 33vw"
            className={`object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
          />
        </Link>
        <div className="absolute -left-2 top-0 flex w-full items-center justify-between px-2">
          <span
            className={cn(
              "ml-[2px] rounded-md bg-white px-2 py-1 text-sm capitalize",
            )}
          >
            <span
              className=" cursor-pointer"
              id={`my-anchor-element-${data?.id}`}
            >
              <span
                className={cn(
                  "font-semibold",
                  data?.type === "pre-order" || data?.productType === "preorder"
                    ? "text-red-600"
                    : "text-green-700",
                )}
              >
                {data?.productType}
                {data?.type}
              </span>
            </span>
            <Tooltip
              style={{
                left: "8px !important",
                transform: "translateX(-8px)",
              }}
              className="border bg-[#fff_!important] text-[#333_!important]"
              anchorSelect={`#my-anchor-element-${data?.id}`}
              content={
                data?.type === "pre-order" || data?.productType === "preorder"
                  ? "Preorder now for a fresh bake!"
                  : "Ready for immediate purchase!"
              }
              place="bottom-start"
            />
          </span>

          <Favorite fav={fav} setFav={setFav} data={data} />
        </div>
      </figure>
      <div className="mb-1 flex flex-col text-lg">
        {" "}
        <span className="text-base font-semibold text-neutral-500">
          &euro;{data?.minPrice} - &euro;{data?.maxPrice}
        </span>
        <h3 className="font-semibold capitalize underline underline-offset-1">
          <Link href={`/shop/${data?.slug}?productId=${productId}`}>
            <span className="w-full" onClick={() => handleProduct(data)}>
              {data?.name}
            </span>
          </Link>
        </h3>
      </div>
      <p className=" mb-1 line-clamp-2 min-h-12 text-neutral-500">
        {data?.description}
      </p>
      <div className="inline-flex gap-2">
        <StarRating iconSize={20} canRate={false} />{" "}
        <span className="text-sm">(32)</span>
      </div>
      <button
        onClick={() => {
          handleProduct(data);
          router.push(`/shop/${data?.slug}?productId=${productId}`);
        }}
        className="flex w-full flex-grow items-center justify-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-0 py-2.5 text-goldie-300"
      >
        Shop now
      </button>
    </div>
  );
});

export default ProductCard;
