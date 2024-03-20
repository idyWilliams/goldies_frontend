"use client";
import Image from "next/image";

import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";

import { CgMenuCake } from "react-icons/cg";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  decrementProductQty,
  incrementProductQty,
} from "@/redux/features/product/productSlice";
import {
  cakeProducts1,
  cakeShapes,
  cakeSizes,
  cakeTimes,
  fillingsList,
  toppings,
} from "@/utils/cakeData";
import { addSlugToCakes } from "@/helper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { GiShoppingCart } from "react-icons/gi";

function generateSizeArray(minSize: any, maxSize: any) {
  const sizes = [];
  for (let i = minSize; i <= maxSize; i++) {
    sizes.push(i);
  }
  return sizes;
}

export type SelectOptionType = {
  label: string | number;
  value: string | number;
  description?: string;
} | null;

function CakeDetailsPage({ params }: any) {
  const [loading, setLoading] = useState(true);
  const [fillings, setFillings] = useState<SelectOptionType>(null);
  const [shapes, setShapes] = useState<SelectOptionType>(null);
  const [duration, setDuration] = useState<SelectOptionType>(null);
  const [addons, setAddons] = useState<SelectOptionType>(null);
  const [sizes, setSizes] = useState<SelectOptionType>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.product.cart);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const cartTotal = Object.values(cart).reduce((acc, current) => {
    return acc + parseFloat(current.maxPrice) * (current.quantity as number);
  }, 0);
  // console.log(cart, "cart");

  const cakes = addSlugToCakes(cakeProducts1);

  console.log(cakes, "kkk");
  const cakeProduct = useMemo(() => cakes, [cakes]);

  // console.log("Params Alias:", params);
  // console.log("Cake Products:", cakeProduct);

  const getProduct = cakeProduct.find(
    (product: { slug: any }) => product.slug === params.alias,
  );

  useEffect(() => {
    if (getProduct) {
      setLoading(false);
    }
  }, [getProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!getProduct) {
    return <div>Product not found.</div>;
  }

  const data = {
    shape: create(shapes),
    size: create(sizes),
    filling: create(fillings),
    cakeDetails: {
      time: time,
      duration: create(duration),
      addons: create(addons),
    },
    message: message,
  };

  function create(value: any) {
    if (value !== null) {
      const { label, description } = value;
      return { label, description };
    }
  }

  const handleClick = () => {
    dispatch(addProductToCart({ id: getProduct.id }));
    console.log(getProduct.id);
    // setShapes(null)
  };

  // console.log(shapes, "shapes")

  const navigateToCart = () => {
    router.push("/cart");
  };
  return (
    <>
      <Layout>
        <section className="bg-black pb-6 pt-20">
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
                  name: getProduct ? getProduct.name : "",
                  link: "/shop/cakes",
                },
              ]}
            />
          </div>
        </section>
        <section className="bg-main py-16">
          <div className="wrapper">
            <div className="grid sm:grid-cols-[1.5fr_2fr] sm:gap-5 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr]">
              <div className="sm:col-span-2 md:col-span-1">
                <Image
                  src={getProduct.imageUrl}
                  alt={getProduct.slug}
                  className="mx-auto h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 space-y-2 sm:mt-0">
                <h3 className="text-xl font-bold">{getProduct.name}</h3>
                <span className="font-bold">
                  &euro;{getProduct.minPrice} - &euro;{getProduct.maxPrice}
                </span>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
                  <li>6″ round serves 10 - 12</li>
                  <li>6″ square serves 16 – 18</li>
                  <li>8″ round serves 18 – 20</li>
                  <li>8″ square serves 30 – 32</li>
                  <li>10″ round serves 26 – 28</li>
                  <li>10″ square serves 48 – 50</li>
                </ul>
                <div className="w-80">
                  <h1 className="flex items-center gap-[2px] font-medium text-gray-800  underline">
                    <CgMenuCake /> Description
                  </h1>
                  <p className="text-sm  font-medium text-gray-600">
                    {getProduct.description}
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 md:col-span-2 lg:col-span-1">
                <label htmlFor="size" className="mb-3 block">
                  <span
                    className="mb-1 inline-block font-bold"
                    onClick={() => console.log(shapes, "shapes new")}
                  >
                    Size
                  </span>
                  <CustomSelect
                    selectedOption={sizes}
                    setSelectOption={setSizes}
                    options={cakeSizes || []}
                  />
                </label>
                <label htmlFor="filling" className="mb-3 block">
                  <span className="mb-1 inline-block font-bold">Filling</span>
                  <CustomSelect
                    selectedOption={fillings}
                    setSelectOption={setFillings}
                    options={fillingsList || []}
                  />
                </label>
                <label htmlFor="shape" className="mb-3 block">
                  <span className="mb-1 inline-block font-bold">Shape</span>
                  <CustomSelect
                    selectedOption={shapes}
                    setSelectOption={setShapes}
                    options={cakeShapes || []}
                  />
                </label>
              </div>
            </div>

            <hr className="my-8 border-0 border-t-2 border-[#B89C3D]" />
            <div>
              <h3 className="mb-8 text-xl font-bold">Cake Details</h3>
              <div className="">
                <div className="gap-3 sm:grid sm:grid-cols-2">
                  <label
                    htmlFor="duration"
                    className="mb-3 block sm:col-span-2"
                  >
                    <span className="mb-1 inline-block font-bold">
                      When do you need your cake ready?
                    </span>
                    <CustomSelect
                      selectedOption={duration}
                      setSelectOption={setDuration}
                      options={cakeTimes || []}
                    />
                    <p>
                      48hrs is the minimum time required for all cake orders
                    </p>
                  </label>
                  <label htmlFor="time" className="mb-3 block">
                    <span className="mb-1 inline-block font-bold">
                      Preferred Pick-up Time?
                    </span>
                    <input
                      type="datetime-local"
                      name="time"
                      id="time"
                      placeholder="Choose an option"
                      className="form-input h-[51px] w-full rounded-lg border-2 border-black bg-[#fcfaf0] p-3 py-4 focus:border-black focus:shadow-none focus:outline-0 focus:ring-0"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </label>
                  <label htmlFor="toppings" className="mb-3 block">
                    <span className="mb-1 inline-block font-bold">
                      Toppings and Add-ons + &euro;10
                    </span>
                    <CustomSelect
                      selectedOption={addons}
                      setSelectOption={setAddons}
                      options={toppings || []}
                    />
                  </label>
                  <label htmlFor="message" className="col-span-2 mb-3 block">
                    <span className="mb-1 inline-block font-bold">
                      Additional Cake Details
                    </span>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Please specify other details like cake text, color, design requests"
                      className="form-input h-[120px] w-full rounded-lg border-2 border-black bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
                  <div className="flex items-start justify-between gap-8 sm:col-[2]">
                    <ul className="space-y-2 font-bold">
                      <li>Product Total</li>
                      <li>Options Total</li>
                      <li>Grand Total</li>
                    </ul>
                    <ul className="space-y-2 sm:text-right">
                      <li>&euro;{getProduct.minPrice}</li>
                      <li>&euro;100</li>
                      <li>
                        &euro;
                        {((getProduct.minPrice as number) + 100) * quantity}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-3 sm:mt-5 sm:justify-end">
                    {/* <div className="inline-flex items-center gap-3 rounded-[50px] border-2 border-black bg-white px-1.5 py-1">
                      <span
                        onClick={() =>
                          dispatch(decrementProductQty({ id: getProduct.id }))
                        }
                        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                      >
                        <BsDash size={24} />
                      </span>
                      <span className="font-bold">{getProduct.quantity}</span>
                      <span
                        onClick={() =>
                          dispatch(incrementProductQty({ id: getProduct.id }))
                        }
                        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                      >
                        <BsPlus size={24} />
                      </span>
                    </div> */}
                    <button
                      onClick={navigateToCart}
                      className="flex items-center gap-1 rounded-full border border-black bg-main px-5 py-2 text-black shadow-md"
                    >
                      See Cart Item <GiShoppingCart />
                    </button>
                    <button
                      onClick={handleClick}
                      className="rounded-full bg-black px-5 py-2 text-main shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default CakeDetailsPage;
