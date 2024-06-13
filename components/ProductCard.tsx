import Image from "next/image";
import StarRating from "./StarRating";
import { Heart, ShoppingCart } from "iconsax-react";
import Img from "../public/assets/banana-cake-with-cinnamon-cream-102945-1.jpeg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { addProductToCart } from "@/redux/features/product/productSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProductCard({ data }: { data: any }) {
  const [fav, setFav] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);

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

  return (
    <div className="w-full rounded-[10px] border border-neutral-100 bg-white p-2 shadow-[0_0_30px_-10px_rgba(0,0,0,0.1)]">
      <figure className="relative mb-3 h-[230px] w-full overflow-hidden rounded-[5px]">
        <Link href={`/shop/${data?.slug}`}>
          <Image
            src={data?.imageUrl}
            alt={data?.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
        <span
          className="absolute right-2 top-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[5px] bg-black bg-opacity-50 text-goldie-300"
          onClick={() => setFav((prev: any) => !prev)}
        >
          {fav ? <Heart size={20} variant="Bold" /> : <Heart size={20} />}
        </span>
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
      <p className="mb-1 text-neutral-500">{data?.description}</p>
      <div className="inline-flex gap-2">
        <StarRating iconSize={20} canRate={false} />{" "}
        <span className="text-sm">(32)</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className="inline-flex flex-grow items-center justify-center gap-2 rounded-md border border-neutral-900 bg-neutral-900 px-0 py-2.5 text-goldie-300"
        >
          <span className="">
            <ShoppingCart size={20} />
          </span>{" "}
          Add to cart
        </button>
        <button
          onClick={handleBuyNow}
          className="rounded-md border border-neutral-900 px-4 py-2.5 text-neutral-900"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
