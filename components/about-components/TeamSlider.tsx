"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Team1 from "@/public/assets/about-us/team-1.png";
import Team2 from "@/public/assets/about-us/team-2.png";
import Team3 from "@/public/assets/about-us/team-3.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

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

const TeamSlider = () => {
  return (
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
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
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
          <div className="flex flex-col items-center border border-neutral-300 py-5">
            <Image
              src={item?.image}
              alt={item?.name}
              className="rounded-full"
            />
            <h3 className="text-center font-semibold text-brand-200">
              {item?.name}
            </h3>
            <p className="text-center text-sm text-neutral-700">{item?.role}</p>
          </div>
        </SwiperSlide>
      ))}
      <div className="absolute right-0 top-0 z-10 h-full w-[120px] bg-gradient-to-l from-brand-100 via-brand-100 to-transparent" />
      <div className="absolute left-0 top-0 z-10 h-full w-[120px] bg-gradient-to-r from-brand-100 via-brand-100 to-transparent" />
    </Swiper>
  );
};

export default TeamSlider;
