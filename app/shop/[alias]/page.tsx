"use client";
import Image from "next/image";
import LemonCake from "../../../public/assets/lemon-cake.webp";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";
import { cakeProducts1 } from "../page";
import { useEffect, useMemo, useState } from "react";

const CakeDetailsPage = ({ params }: any) => {
  const [loading, setLoading] = useState(true);

  const memoizedCakeProducts = useMemo(() => cakeProducts1, []);

  console.log("Params Alias:", params);
  console.log("Cake Products:", memoizedCakeProducts);

  const getProduct = memoizedCakeProducts.find(
    (product) => product.slug === params.alias,
  );
  console.log("Found Product:", getProduct);

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
                  name: "Shop Page",
                  link: "/shop",
                },
                {
                  name: getProduct ? getProduct.cakeName : "",
                  link: "/shop/cakes",
                },
              ]}
            />
          </div>
        </section>
        <section className="bg-main py-16">
          <div className="wrapper">
            <div className="grid sm:grid-cols-[1fr_2fr] sm:gap-5 md:grid-cols-[1fr_0.5fr_1fr]">
              <div className="sm:col-span-2 md:col-span-1">
                <Image
                  src={getProduct.image}
                  alt={getProduct.slug}
                  className="mx-auto h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 sm:mt-0">
                <h3 className="text-xl font-bold">{getProduct.cakeName}</h3>
                <span>&euro;60.00 - &euro;227.00</span>
                <ul className="mt-3 flex flex-col gap-2">
                  <li>6″ round serves 10 - 12</li>
                  <li>6″ square serves 16 – 18</li>
                  <li>8″ round serves 18 – 20</li>
                  <li>8″ square serves 30 – 32</li>
                  <li>10″ round serves 26 – 28</li>
                  <li>10″ square serves 48 – 50</li>
                </ul>
              </div>
              <div className="mt-5 sm:mt-0">
                <label htmlFor="size" className="mb-3 block">
                  <span className="mb-1 inline-block font-bold">Size</span>
                  {/* <select
                    name="size"
                    id="size"
                    className="form-select w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                  >
                    <option selected value="choose">
                      Choose an option
                    </option>
                    <option value="6">6 Inches</option>
                    <option value="10">10 Inches</option>
                    <option value="18">18 Inches</option>
                    <option value="custom">Custom Inches</option>
                  </select> */}
                </label>
                <label htmlFor="filling" className="mb-3 block">
                  <span className="mb-1 inline-block font-bold">Filling</span>
                  {/* <select
                    name="filling"
                    id="filling"
                    className="form-select w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                  >
                    <option selected value="choose">
                      Choose an option
                    </option>
                    <option value="6">6 Inches</option>
                    <option value="10">10 Inches</option>
                    <option value="18">18 Inches</option>
                    <option value="custom">Custom Inches</option>
                  </select> */}
                </label>
                <label htmlFor="shape" className="mb-3 block">
                  <span className="mb-1 inline-block font-bold">Shape</span>
                  {/* <select
                    name="shape"
                    id="shape"
                    className="form-select w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                  >
                    <option selected value="choose">
                      Choose an option
                    </option>
                    <option value="squ">Square</option>
                    <option value="rect">Rectangle</option>
                    <option value="angle">Triangle</option>
                    <option value="custom">Custom Shape</option>
                  </select> */}
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
                    {/* <select
                      name="duration"
                      id="duration"
                      className="form-select w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                    >
                      <option selected value="choose">
                        Choose an option
                      </option>
                      <option value="48">48 Hours (2days)</option>
                      <option value="72">72 Hours(3 days)</option>
                      <option value="96">96 Hours(4 days)</option>
                      <option value="week">In a week</option>
                    </select> */}
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
                      className="form-input w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                    />
                  </label>
                  <label htmlFor="toppings" className="mb-3 block">
                    <span className="mb-1 inline-block font-bold">
                      Toppings and Add-ons + &euro;10
                    </span>
                    {/* <select
                      name="toppings"
                      id="toppings"
                      className="form-select w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                    >
                      <option selected value="choose">
                        Choose an option
                      </option>
                      <option value="6">6 Inches</option>
                      <option value="10">10 Inches</option>
                      <option value="18">18 Inches</option>
                      <option value="custom">Custom Inches</option>
                    </select> */}
                  </label>
                  <label htmlFor="message" className="col-span-2 mb-3 block">
                    <span className="mb-1 inline-block font-bold">
                      Additional Cake Details
                    </span>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Please specify other details like cake text, colour, design requests"
                      className="form-input h-[120px] w-full rounded-lg border-0 bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                    />
                  </label>
                  <div className="flex items-start justify-between gap-8">
                    <ul className="space-y-2 font-bold">
                      <li>Product Total</li>
                      <li>Options Total</li>
                      <li>Grand Total</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>&euro;200</li>
                      <li>&euro;100</li>
                      <li>&euro;300</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-3 rounded-[50px] bg-white px-1.5 py-1">
                      <span className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main">
                        <BsDash size={24} />
                      </span>
                      <span className="font-bold">1</span>
                      <span className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main">
                        <BsPlus size={24} />
                      </span>
                    </div>
                    <button className="rounded-full bg-black px-5 py-2 text-main">
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
};

export default CakeDetailsPage;
