import Image from "next/image";
import { Heart } from "iconsax-react";
import { useEffect, useState } from "react";
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
import { DialogCloseButton } from "../DialogModal";

export default function ProductCard({ data }: { data: any }) {
  const [previewFav, setPreviewFav] = useState(false);
  const [fav, setFav] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product?.cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const addFavProducts = useUserPdctStore((state) => state.addFavProduct);
  const removeFavProducts = useUserPdctStore((state) => state.removeFavProduct);
  const [isLogin, setIsLogin] = useState<boolean>();

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

  const addToSavedItems = (data: any) => {
    if (!fav) {
      setFav(true);
      addFavProducts(data);
    } else {
      setFav(false);
      const productId = data.id?.toString();
      removeFavProducts(productId);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogin = JSON.parse(localStorage.getItem("isLogin") as string);
      setIsLogin(Boolean(isLogin));
    }
  }, []);

  return (
    <div className="w-full rounded-[10px] border border-neutral-100 bg-white p-2 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)]">
      <figure className="relative mb-3 h-[230px] w-full overflow-hidden rounded-[5px]">
        <Link
          href={`/shop/${data?.slug}`}
          className="relative inline-block h-full w-full overflow-hidden"
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
            src={data?.imageUrl}
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
                  data?.type === "pre-order"
                    ? "text-red-600"
                    : "text-green-700",
                )}
              >
                {data?.type}
              </span>
            </span>
            <Tooltip
              style={{ left: "8px !important", transform: "translateX(-8px)" }}
              className="border bg-[#fff_!important] text-[#333_!important]"
              anchorSelect={`#my-anchor-element-${data?.id}`}
              content={
                data?.type === "pre-order"
                  ? "Preorder now for a fresh bake!"
                  : "Ready for immediate purchase!"
              }
              place="bottom-start"
            />
          </span>

          <span
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5px] bg-black bg-opacity-50 text-goldie-300"
            onClick={() => addToSavedItems(data)}
            onMouseEnter={() => setPreviewFav(true)}
            onMouseLeave={() => {
              if (fav) return;
              setPreviewFav(false);
            }}
          >
            {isLogin ? (
              <Heart
                size={20}
                variant={fav || previewFav ? "Bold" : undefined}
              />
            ) : (
              <DialogCloseButton>
                <Heart
                  size={20}
                  variant={fav || previewFav ? "Bold" : undefined}
                />
              </DialogCloseButton>
            )}
            {/* <Heart size={20} variant={fav || previewFav ? "Bold" : undefined} /> */}
          </span>
        </div>
      </figure>
      <div className="mb-1 flex flex-col text-lg">
        {" "}
        <span className="text-base font-semibold text-neutral-500">
          &euro;{data?.minPrice} - &euro;{data?.maxPrice}
        </span>
        <h3 className="font-semibold capitalize underline underline-offset-1">
          <Link href={`/shop/${data?.slug}`}>{data?.name}</Link>
        </h3>
      </div>
      <p className=" mb-1 line-clamp-2 text-neutral-500">{data?.description}</p>
      <div className="inline-flex gap-2">
        <StarRating iconSize={20} canRate={false} />{" "}
        <span className="text-sm">(32)</span>
      </div>
      <button
        onClick={() => router.push(`/shop/${data?.slug}`)}
        className="flex w-full flex-grow items-center justify-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-0 py-2.5 text-goldie-300"
      >
        Shop now
      </button>
    </div>
  );
}
