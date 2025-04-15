import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Button } from "./ui/button";
import EachElement from "@/helper/EachElement";
import Image from "next/image";
import HeroBg from "../public/assets/cake.png";
import Slide1 from "../public/assets/slides/slide-1.webp";
import Slide2 from "../public/assets/slides/slide-2.webp";
import Slide3 from "../public/assets/slides/slide-3.webp";
import Slide4 from "../public/assets/slide-4.jpeg";
import Slide5 from "../public/assets/slide-5.jpeg";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCustomersAnalytics } from "@/services/hooks/summary";
import { Cake, User, Book } from "iconsax-react";
import { FaSpinner } from "react-icons/fa";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: getCustomersAnalytics,
  });

  const stats = useMemo(() => {
    if (isLoading || isError || !data?.data) {
      return [
        {
          icon: <Cake size={24} variant="Bold" />,
          value: "Loading...",
          title: "Cakes Delivered",
        },
        {
          icon: <User size={24} variant="Bold" />,
          value: "Loading...",
          title: "Verified Customers",
        },
        {
          icon: <Book size={24} variant="Bold" />,
          value: "Loading...",
          title: "Cakes Recipes",
        },
      ];
    }

    const { cakesDelivered, verifiedCustomers, recipesCount } = data.data;

    return [
      {
        icon: <Cake size={24} variant="Bold" />,
        value: cakesDelivered > 0 ? `${cakesDelivered}+` : "0",
        title: "Cakes Delivered",
      },
      {
        icon: <User size={24} variant="Bold" />,
        value: verifiedCustomers > 0 ? `${verifiedCustomers}+` : "0",
        title: "Verified Customers",
      },
      {
        icon: <Book size={24} variant="Bold" />,
        value: recipesCount > 0 ? `${recipesCount}+` : "0",
        title: "Cakes Recipes",
      },
    ];
  }, [data, isLoading, isError]);

  return (
    <section className="relative h-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        loop
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper h-[70vh] w-full md:h-[50vh] lg:h-screen"
      >
        <SwiperSlide
          style={{ display: "flex" }}
          className="relative items-center overflow-hidden"
        >
          <div className="absolute inset-0 -z-10"></div>

          <Image
            src={Slide1}
            alt="hero cake"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            unoptimized
            className={` -z-50 object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
          />

          <div className="wrapper flex h-full items-center">
            <div className="md:w-[50%] xl:w-[40%]">
              <h1 className="mb-2 text-4xl font-bold text-brand-200 md:text-6xl xl:text-6xl xl:leading-[1.3]">
                Taste the Extraordinary
              </h1>
              <p className="text-balance text-xl text-brand-200 lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Crafting Smiles, One Delicious Moment at a time.
              </p>
              <Button
                size="lg"
                className="mt-6 h-auto bg-brand-200 py-3 font-medium text-brand-100 hover:bg-brand-200"
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
          <div className="absolute inset-0 -z-10"></div>

          <Image
            src={Slide2}
            alt="hero cake"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            fill
            className=" -z-50 object-cover object-center"
            placeholder="blur"
          />
          <div className="wrapper">
            <div className="md:w-[50%] xl:w-[40%]">
              <h1 className="mb-2 text-4xl font-bold text-brand-200 md:text-6xl xl:text-6xl xl:leading-[1.3]">
                Every cake is a Masterpiece
              </h1>
              <p className="text-balance text-xl text-brand-200 lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Unique bespoke cake designed Just for You.
              </p>
              <Button
                size="lg"
                className="mt-6 h-auto bg-brand-200 py-3 font-medium text-brand-100 hover:bg-brand-200"
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
          <div className="absolute inset-0 -z-10"></div>
          <Image
            src={Slide3}
            alt="hero cake"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 75vw, 33vw"
            fill
            className=" -z-50 object-cover object-center"
            placeholder="blur"
          />
          <div className="wrapper">
            <div className="md:w-[50%] xl:w-[40%]">
              <h1 className="mb-2 text-4xl font-bold text-brand-200 md:text-6xl xl:text-6xl xl:leading-[1.3]">
                Cake for Every Occasion
              </h1>
              <p className="text-balance text-xl text-brand-200 lg:leading-[1.5] xl:mt-4 xl:text-2xl">
                Personalized for occasions and events.
              </p>
              <Button
                size="lg"
                className="mt-6 h-auto bg-brand-200 py-3 font-medium text-brand-100 hover:bg-brand-200"
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
      </Swiper>
      {/* STATS */}
      <div className="bottom-0 left-0 z-10 w-full bg-brand-200 py-3 lg:absolute">
        <div className="wrapper flex w-full flex-col items-center justify-between sm:justify-evenly sm:gap-8 md:flex-row md:divide-y-0">
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-4">
              <FaSpinner size={32} className="animate-spin text-brand-100" />
            </div>
          ) : (
            <EachElement
              of={stats}
              render={(item: { icon: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; value: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center py-2 text-center"
                >
                  {/* <div className="mb-2 text-brand-100">{item.icon}</div> */}
                  <h3 className="text-2xl font-semibold text-brand-100 md:text-3xl">
                    {item.value}
                  </h3>
                  <p className="text-sm font-normal text-brand-100">
                    {item.title}
                  </p>
                </div>
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
