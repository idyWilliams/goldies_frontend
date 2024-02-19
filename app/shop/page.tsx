import Header from "@/components/Header";
import Image from "next/image";
import Chocolate from "../../public/assets/birthday-cake.webp";
import LemonCake from "../../public/assets/lemon-cake.webp";
import RedVelvet from "../../public/assets/red-velvet-cake.webp";
import Footer from "@/components/Footer";
import BreadCrumbs from "@/components/BreadCrumbs";

const ShopPage = () => {
  return (
    <>
      <Header />
      <section className="bg-black">
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
      <div className="py-16">
        <div className="wrapper">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={Chocolate}
                  alt="Chocolate and cream butter cake"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">
                Chocolate and Cream Butter
              </h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={LemonCake}
                  alt="Lemon cake"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Lemon Cake Sponge</h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={RedVelvet}
                  alt="Red Velet cake"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Red Velvet Cake</h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={Chocolate}
                  alt="Vanilla Lemon Sponge"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Vanilla Lemon Sponge</h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Select Option
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="bg-black py-16">
        <div className="wrapper">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={Chocolate}
                  alt="Vanilla Lemon Sponge"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">
                Chocolate and Cream Butter
              </h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold uppercase text-black">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={Chocolate}
                  alt="Vanilla Lemon Sponge"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Lemon Cake Sponge</h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold text-black">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={Chocolate}
                  alt="Vanilla Lemon Sponge"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Red Velvet Cake</h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold text-black">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={Chocolate}
                  alt="Vanilla Lemon Sponge"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Vanilla Lemon Sponge</h3>
              <span>&euro;59.00 - &euro;150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold text-black">
                Select Option
              </button>
            </div>
          </div>
        </div>
      </div>

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
