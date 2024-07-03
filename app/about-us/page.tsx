"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";
import Founder from "../../public/assets/about-us/founder.png";
import Team1 from "../../public/assets/about-us/team-1.png";
import Team2 from "../../public/assets/about-us/team-2.png";
import Team3 from "../../public/assets/about-us/team-3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const teams = [
  {
    image: Team1,
    name: "Johnathan John",
    role: "Pastry Chef",
  },
  {
    image: Team2,
    name: "Adam Smith",
    role: "Bakery Clerk",
  },
  {
    image: Team3,
    name: "Amy Lisa",
    role: "Cake Decorator",
  },
  {
    image: Team1,
    name: "Johnathan",
    role: "Cake Icer",
  },
];

const AboutUs = () => {
  return (
    <Layout>
      <div className="mt-[64px] md:mt-20" />
      <div className="bg-black py-3">
        <div className="wrapper">
          <BreadCrumbs
            items={[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "About Us",
                link: "/about-us",
              },
            ]}
          />
        </div>
      </div>

      {/* ========= OUR COMPANY ============ */}

      <section className="py-4">
        <div className="wrapper">
          <div className="mb-3 flex flex-col items-center justify-center">
            <h3 className="inline-block text-2xl font-bold">Our Company</h3>
            <span className="h-0.5 w-[60px] bg-goldie-300"></span>
          </div>
          <p className="text-center">
            Goldis offers a wide range of cakes for different occasions. Whether
            you seek a whimsical unicorn cake for your child's birthday, an
            elegant tiered cake for a lavish wedding, or a heartfelt
            heart-shaped cake for a romantic anniversary, Goldis has the perfect
            choice for you. Our cakes embody more than just exceptional taste;
            they symbolize personal emotions, celebrating love, joy, and
            treasured memories.
          </p>
        </div>
      </section>

      {/* ========= OUR FOUNDER ============ */}
      <section className="bg-goldie-300">
        <h2 className="py-4 text-center text-2xl font-semibold">Our Founder</h2>

        <div className="bg-neutral-700 py-5">
          <div className="wrapper sm:grid sm:grid-cols-2">
            <>
              <div className="flex items-center justify-center">
                <Image src={Founder} alt="our-founder" className="w-1/2" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-goldie-300">
                  Mrs Goldis Confectinery
                </h3>
                <span className="text-sm text-goldie-300">
                  Professional Baker
                </span>
                <p className="mt-2 text-balance text-white">
                  Mrs Goldis Confectionery combines 15 years of baking expertise
                  with a passion for creating memorable celebrations. Each cake
                  reflects our commitment to quality and joy, ensuring every
                  moment with Goldis is unforgettable.
                </p>
              </div>
            </>
          </div>
        </div>
      </section>

      {/* ========= OUR TEAM ============ */}
      <section className="py-5">
        <div className="wrapper">
          <h2 className="text-xl font-semibold uppercase">Meet the Team</h2>
          <div className="w-full">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              navigation
              modules={[Pagination, Navigation]}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {teams?.map((item: any, index: number) => (
                <SwiperSlide key={index} className="">
                  <div className="flex flex-col items-center">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="rounded-full"
                    />
                    <h3 className="text-center font-semibold text-goldie-300">
                      {item?.name}
                    </h3>
                    <p className="text-center text-sm text-neutral-700">
                      {item?.role}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
