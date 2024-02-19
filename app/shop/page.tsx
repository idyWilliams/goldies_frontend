import Header from "@/components/Header";
import Image from "next/image";
import Chocolate from "../../public/assets/birthday-cake.webp";
import LemonCake from "../../public/assets/lemon-cake.webp";
import RedVelvet from "../../public/assets/red-velvet-cake.webp";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";

const cakeProducts1 = [
  {
    id: 1,
    cakeName: "Chocolate and Cream Butter",
    image: Chocolate,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 1,
    cakeName: "Lemon Cake Sponge",
    image: LemonCake,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 1,
    cakeName: "Red Velvet Cake",
    image: RedVelvet,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 1,
    cakeName: "Vanilla Lemon Sponge",
    image: LemonCake,
    priceFrom: 59,
    priceTo: 150,
  },
];

const cakeProducts2 = [
  {
    id: 1,
    cakeName: "Chocolate and Cream Butter",
    image: Chocolate,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 1,
    cakeName: "Lemon Cake",
    image: LemonCake,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 1,
    cakeName: "Red Velvet Cake Sponge",
    image: RedVelvet,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 1,
    cakeName: "Vanilla Lemon Sponge",
    image: LemonCake,
    priceFrom: 59,
    priceTo: 150,
  },
];

const ShopPage = () => {
  return (
    <>
      <Header />
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
            ]}
          />
        </div>
      </section>
      <section className="py-16 pt-3">
        <div className="wrapper">
          <h3 className="mb-6 mt-4 text-2xl font-bold text-black">All Cakes</h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
            {cakeProducts1.map((cake: any, index: number) => (
              <div
                key={index}
                className="flex w-full flex-col items-center md:px-4"
              >
                <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                  <Image
                    src={cake.image}
                    alt={cake.cakeName}
                    className="mx-auto h-full w-full object-cover"
                  />
                </figure>

                <h3 className="mt-3 text-xl font-bold capitalize">
                  {cake.cakeName}
                </h3>
                <span className="text-lg">
                  &euro;{cake.priceFrom} - &euro;{cake.priceTo}
                </span>
                <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main">
                  Select Option
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  */}

      <section className="bg-black py-16">
        <div className="wrapper">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
            {cakeProducts2.map((cake: any, index: number) => (
              <div
                key={index}
                className="flex w-full flex-col items-center md:px-4"
              >
                <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                  <Image
                    src={cake.image}
                    alt={cake.cakeName}
                    className="mx-auto h-full w-full object-cover"
                  />
                </figure>

                <h3 className="mt-3 text-xl font-bold capitalize text-main">
                  {cake.cakeName}
                </h3>
                <span className="text-lg text-main">
                  &euro;{cake.priceFrom} - &euro;{cake.priceTo}
                </span>
                <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold uppercase text-black underline">
                  Select Option
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="bg-main py-16">
        <div className="wrapper">
          <div className="grid sm:grid-cols-[1fr_2fr] sm:gap-5 md:grid-cols-[1fr_0.5fr_1fr]">
            <div className="sm:col-span-2 md:col-span-1">
              <Image
                src={LemonCake}
                alt="Lemon Cake"
                className="mx-auto h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 sm:mt-0">
              <h3 className="text-xl font-bold">Lemon Cake</h3>
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
                <select
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
                </select>
              </label>
              <label htmlFor="filling" className="mb-3 block">
                <span className="mb-1 inline-block font-bold">Filling</span>
                <select
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
                </select>
              </label>
              <label htmlFor="shape" className="mb-3 block">
                <span className="mb-1 inline-block font-bold">Shape</span>
                <select
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
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ShopPage;
