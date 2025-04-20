import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "./ui/button";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import HeroBg from "../public/assets/cake.png";
import HeroBgGif from "../public/assets/cake.gif";
import Slide2 from "../public/assets/slide-2.png";
import Slide3 from "../public/assets/slide-3.png";
import Slide4 from "../public/assets/slide-4.jpeg";
import Slide5 from "../public/assets/slide-5.jpeg";
import { useState } from "react";
import { useRouter } from "next/navigation";

const stats = [
  { value: "12000+", title: "Cakes Delivered" },
  { value: "12000+", title: "Verified Customers" },
  { value: "500+", title: "Cakes Recipes" },
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[40vh] w-full xl:h-screen"
      >
        <SwiperSlide
          style={{ display: "flex" }}
          className="relative items-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000ac] to-[#0000007c]"></div>

          {!isLoaded && (
            <Image
              src={HeroBg}
              alt="hero cake"
              fill
              sizes="(max-width: 1024px) 75vw "
              priority
              className=" -z-50 object-cover object-center"
              placeholder="blur"
            />
          )}

          <Image
            src={HeroBgGif}
            alt="hero cake"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            unoptimized
            className={` -z-50 object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
          />

          <div className="wrapper">
            <div className="lg:w-[30%] xl:w-[40%]">
              <h1 className="text-3xl font-bold text-white xl:text-6xl xl:leading-[1.3]">
                Taste the Extraordinary
              </h1>
              <p className="text-balance text-xl text-white lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Crafting Smiles, One Delicious Moment at a time.
              </p>
              <Button
                size="lg"
                className="mt-6 bg-goldie-500 font-semibold text-black hover:bg-goldie-300"
                onClick={() => {
                  console.log("click order now button on slide 1");
                  router.push("/shop");
                }}
              >
                Order Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{ display: "flex" }}
          className="relative items-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000ac] to-[#0000007c]"></div>
          <Image
            src={Slide2}
            alt="hero cake"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            fill
            className=" -z-50 object-cover object-center"
            placeholder="blur"
          />
          <div className="wrapper">
            <div className="lg:w-[30%] xl:w-[40%]">
              <h1 className="text-3xl font-bold text-white xl:text-6xl xl:leading-[1.3]">
                Every cake is a Masterpiece
              </h1>
              <p className="text-balance text-xl text-white lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Unique bespoke cake designed Just for You.
              </p>
              <Button
                size="lg"
                className="mt-6 bg-goldie-500 font-semibold text-black hover:bg-goldie-300"
                onClick={() => {
                  console.log("click order now button on slide 2");
                  router.push("/shop");
                }}
              >
                Order Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{ display: "flex" }}
          className="relative items-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000ac] to-[#0000007c]"></div>
          <Image
            src={Slide3}
            alt="hero cake"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            fill
            className=" -z-50 object-cover object-center"
            placeholder="blur"
          />
          <div className="wrapper">
            <div className="lg:w-[30%] xl:w-[40%]">
              <h1 className="text-3xl font-bold text-white xl:text-6xl xl:leading-[1.3]">
                Cake for Every Occasion
              </h1>
              <p className="text-balance text-xl text-white lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Personalized for occasions and events.
              </p>
              <Button
                size="lg"
                className="mt-6 bg-goldie-500 font-semibold text-black hover:bg-goldie-300"
                onClick={() => {
                  console.log("click order now button on slide 3");
                  router.push("/shop");
                }}
              >
                Order Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{ display: "flex" }}
          className="relative items-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000ac] to-[#0000007c]"></div>
          <Image
            src={Slide4}
            alt="hero cake"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            fill
            className=" -z-50 object-cover object-center"
            placeholder="blur"
          />
          <div className="wrapper">
            <div className="lg:w-[30%] xl:w-[40%]">
              <h1 className="text-3xl font-bold text-white xl:text-6xl xl:leading-[1.3]">
                Customized themed Cake
              </h1>
              <p className="text-balance text-xl text-white lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Customized to your satisfaction.
              </p>
              <Button
                size="lg"
                className="mt-6 bg-goldie-500 font-semibold text-black hover:bg-goldie-300"
                onClick={() => {
                  console.log("click order now button on slide 4");
                  router.push("/shop");
                }}
              >
                Order Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{ display: "flex" }}
          className="relative items-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000000ac] to-[#0000007c]"></div>
          <Image
            src={Slide5}
            alt="hero cake"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            fill
            className=" -z-50 object-cover object-center"
            placeholder="blur"
          />
          <div className="wrapper">
            <div className="lg:w-[30%] xl:w-[40%]">
              <h1 className="text-3xl font-bold text-white xl:text-balance xl:text-6xl xl:leading-[1.3]">
                Cupcakes Just for you
              </h1>
              <p className="text-balance text-xl text-white lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Unwrap the joy with every bite.
              </p>
              <Button
                size="lg"
                className="mt-6 bg-goldie-500 font-semibold text-black hover:bg-goldie-300"
                onClick={() => {
                  console.log("click order now button on slide 5");
                  router.push("/shop");
                }}
              >
                Order Now
              </Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* STATS */}
      <section className="bg-neutral-950 py-10">
        <div className="wrapper flex items-center justify-between sm:justify-evenly sm:gap-8">
          <EachElement
            of={stats}
            render={(item: any, index: number) => (
              <div key={index} className="">
                <h3 className="text-xl font-bold text-goldie-300">
                  {item?.value}
                </h3>
                <p className="text-sm font-medium text-goldie-300">
                  {item?.title}
                </p>
              </div>
            )}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
