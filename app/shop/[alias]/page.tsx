"use client";
import Image from "next/image";
import LemonCake from "../../../public/assets/lemon-cake.webp";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";
// import { cakeProducts1 } from "../page";
import { useEffect, useMemo, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { useRouter } from "next/navigation";

const fillingsList = [
  {
    id: 1,
    description: "Rich and decadent chocolate filling",
    name: "Chocolate",
    alias: "chocolate",
  },
  {
    id: 2,
    description: "Classic and creamy vanilla filling",
    name: "Vanilla",
    alias: "vanilla",
  },
  {
    id: 3,
    description: "Sweet and fruity strawberry filling",
    name: "Strawberry",
    alias: "strawberry",
  },
  {
    id: 4,
    description: "Zesty and refreshing lemon filling",
    name: "Lemon",
    alias: "lemon",
  },
  {
    id: 5,
    description: "Tangy and flavorful raspberry filling",
    name: "Raspberry",
    alias: "raspberry",
  },
  {
    id: 6,
    description: "Buttery and caramel-infused filling",
    name: "Caramel",
    alias: "caramel",
  },
  {
    id: 7,
    description: "Bold and aromatic coffee-flavored filling",
    name: "Coffee",
    alias: "coffee",
  },
  {
    id: 8,
    description: "Rich and nutty peanut butter filling",
    name: "Peanut Butter",
    alias: "peanut-butter",
  },
  {
    id: 9,
    description: "Sweet and tropical coconut filling",
    name: "Coconut",
    alias: "coconut",
  },
  {
    id: 10,
    description: "Refreshing and minty filling",
    name: "Mint",
    alias: "mint",
  },
  {
    id: 11,
    description: "Juicy and tangy blueberry filling",
    name: "Blueberry",
    alias: "blueberry",
  },
  {
    id: 12,
    description: "Sweet and tart cherry filling",
    name: "Cherry",
    alias: "cherry",
  },
  {
    id: 13,
    description: "Citrusy and refreshing orange filling",
    name: "Orange",
    alias: "orange",
  },
  {
    id: 14,
    description: "Nutty and aromatic hazelnut filling",
    name: "Hazelnut",
    alias: "hazelnut",
  },
  {
    id: 15,
    description: "Nutty and flavorful almond filling",
    name: "Almond",
    alias: "almond",
  },
];

const cakeShapes = [
  {
    id: 1,
    description: "Classic round shape, perfect for any occasion",
    name: "Round",
    alias: "round",
  },
  {
    id: 2,
    description: "Elegant and traditional rectangular shape",
    name: "Rectangular",
    alias: "rectangular",
  },
  {
    id: 3,
    description: "Modern and chic square shape, ideal for contemporary designs",
    name: "Square",
    alias: "square",
  },
  {
    id: 4,
    description:
      "Unique and whimsical heart shape, symbolizing love and romance",
    name: "Heart",
    alias: "heart",
  },
  {
    id: 5,
    description: "Fun and playful star shape, perfect for themed parties",
    name: "Star",
    alias: "star",
  },
  {
    id: 6,
    description:
      "Stylish and sophisticated oval shape, adding elegance to any celebration",
    name: "Oval",
    alias: "oval",
  },
  {
    id: 7,
    description: "Rustic and charming petal shape, evoking a natural feel",
    name: "Petal",
    alias: "petal",
  },
  {
    id: 8,
    description:
      "Whimsical and magical unicorn shape, perfect for children's birthdays",
    name: "Unicorn",
    alias: "unicorn",
  },
  {
    id: 9,
    description:
      "Creative and customizable tiered shape, adding grandeur to any event",
    name: "Tiered",
    alias: "tiered",
  },
  {
    id: 10,
    description:
      "Simple and versatile sheet shape, ideal for casual gatherings",
    name: "Sheet",
    alias: "sheet",
  },
];

const cakeTimes = [
  {
    id: 1,
    description: "48 hours (minimum time required)",
    name: "48 Hours",
    alias: "48_hours",
  },
  {
    id: 2,
    description: "3 days in advance",
    name: "3 Days",
    alias: "3_days",
  },
  {
    id: 3,
    description: "1 week in advance",
    name: "1 Week",
    alias: "1_week",
  },
  {
    id: 4,
    description: "2 weeks in advance",
    name: "2 Weeks",
    alias: "2_weeks",
  },
  {
    id: 5,
    description: "3 weeks in advance",
    name: "3 Weeks",
    alias: "3_weeks",
  },
  {
    id: 6,
    description: "1 month in advance",
    name: "1 Month",
    alias: "1_month",
  },
  {
    id: 7,
    description: "2 months in advance",
    name: "2 Months",
    alias: "2_months",
  },
  {
    id: 8,
    description: "3 months in advance",
    name: "3 Months",
    alias: "3_months",
  },
  {
    id: 9,
    description: "6 months in advance",
    name: "6 Months",
    alias: "6_months",
  },
  // {
  //   id: 10,
  //   description: "1 year in advance",
  //   name: "1 Year",
  //   alias: "1_year",
  // },
];

const toppings = [
  {
    id: 1,
    description: "Fresh and vibrant fruit slices",
    name: "Fresh Fruit",
    alias: "fresh_fruit",
  },
  {
    id: 2,
    description: "Smooth and velvety chocolate drizzle",
    name: "Chocolate Ganache",
    alias: "chocolate_ganache",
  },
  {
    id: 3,
    description: "Light and airy whipped cream topping",
    name: "Whipped Cream",
    alias: "whipped_cream",
  },
  {
    id: 4,
    description: "Crunchy and flavorful toasted nuts",
    name: "Toasted Nuts",
    alias: "toasted_nuts",
  },
  {
    id: 5,
    description: "Sweet and buttery caramel drizzle",
    name: "Caramel Sauce",
    alias: "caramel_sauce",
  },
];

const cakeSizes = [
  {
    id: 1,
    description: "Perfect for personal indulgence",
    name: "Mini",
    alias: "mini",
  },
  {
    id: 2,
    description: "Ideal for intimate gatherings",
    name: "Small",
    alias: "small",
  },
  {
    id: 3,
    description: "Great for small parties or celebrations",
    name: "Medium",
    alias: "medium",
  },
  {
    id: 4,
    description: "Perfect for large gatherings or events",
    name: "Large",
    alias: "large",
  },
  {
    id: 5,
    description: "Ideal for grand celebrations and weddings",
    name: "Extra Large",
    alias: "extra_large",
  },
];

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

const CakeDetailsPage = ({ params }: any) => {
  const [loading, setLoading] = useState(true);
  const [fillings, setFillings] = useState<SelectOptionType>(null);
  const [shapes, setShapes] = useState<SelectOptionType>(null);
  const [duration, setDuration] = useState<SelectOptionType>(null);
  const [addons, setAddons] = useState<SelectOptionType>(null);
  const [sizes, setSizes] = useState<SelectOptionType>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  // const memoizedCakeProducts = useMemo(() => cakeProducts1, []);

  // console.log("Params Alias:", params);
  // console.log("Cake Products:", memoizedCakeProducts);

  // const getProduct = memoizedCakeProducts.find(
  //   (product) => product.slug === params.alias,
  // );
  // console.log("Found Product:", getProduct);

  // useEffect(() => {
  //   if (getProduct) {
  //     setLoading(false);
  //   }
  // }, [getProduct]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!getProduct) {
  //   return <div>Product not found.</div>;
  // }

  const handleAddToCart = () => {
    // window.scroll(0, 0);
    router.push("/cart", { scroll: true });
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
                  name: "hhs",
                  // name: getProduct ? getProduct.cakeName : "",
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
                {/* <Image
                  src={getProduct.image}
                  alt={getProduct.slug}
                  className="mx-auto h-full w-full object-cover"
                /> */}
              </div>
              <div className="mt-3 sm:mt-0">
                {/* <h3 className="text-xl font-bold">{getProduct.cakeName}</h3> */}
                <span className="font-bold">&euro;60.00 - &euro;227.00</span>
                <ul className="mt-3 flex flex-col gap-2">
                  <li>6″ round serves 10 - 12</li>
                  <li>6″ square serves 16 – 18</li>
                  <li>8″ round serves 18 – 20</li>
                  <li>8″ square serves 30 – 32</li>
                  <li>10″ round serves 26 – 28</li>
                  <li>10″ square serves 48 – 50</li>
                </ul>
              </div>
              <div className="mt-5 sm:mt-0 md:col-span-2 lg:col-span-1">
                <label htmlFor="size" className="mb-3 block">
                  <span className="mb-1 inline-block font-bold">Size</span>
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
                      placeholder="Please specify other details like cake text, colour, design requests"
                      className="form-input h-[120px] w-full rounded-lg border-2 border-black bg-[#fcfaf0] p-3 focus:right-2 focus:border focus:border-black focus:ring-black"
                    />
                  </label>
                  <div className="flex items-start justify-between gap-8 sm:col-[2]">
                    <ul className="space-y-2 font-bold">
                      <li>Product Total</li>
                      <li>Options Total</li>
                      <li>Grand Total</li>
                    </ul>
                    <ul className="space-y-2 sm:text-right">
                      <li>&euro;200</li>
                      <li>&euro;100</li>
                      <li>&euro;{(200 + 100) * quantity}</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-3 sm:mt-5 sm:justify-end">
                    <div className="inline-flex items-center gap-3 rounded-[50px] border-2 border-black bg-white px-1.5 py-1">
                      <span
                        onClick={() =>
                          setQuantity((prev) => (prev === 1 ? prev : prev - 1))
                        }
                        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                      >
                        <BsDash size={24} />
                      </span>
                      <span className="font-bold">{quantity}</span>
                      <span
                        onClick={() =>
                          setQuantity((prev) => (prev >= 1 ? prev + 1 : prev))
                        }
                        className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-main"
                      >
                        <BsPlus size={24} />
                      </span>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="rounded-full bg-black px-5 py-2 text-main"
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
};

export default CakeDetailsPage;
