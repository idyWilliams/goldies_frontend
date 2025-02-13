import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { initials } from "@/helper/initials";
import { BsFacebook } from "react-icons/bs";

const reviews = [
  {
    name: "Sarah Johnson",
    comment:
      "Goldis Cake truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true",
  },
  {
    name: "John Doe",
    comment:
      "Goldis Cake truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true",
  },
  {
    name: "Karen Amy",
    comment:
      "Goldis Cake truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true",
  },
];

const ReviewSlider = () => {
  return (
    <Swiper
      className="hide-scroll-bar review-swiper"
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 1,
          spaceBetween: 80,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 60,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // 1200: {
        //   slidesPerView: 4,
        //   spaceBetween: 30,
        // },
      }}
      navigation
      modules={[Pagination, Navigation]}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {reviews?.map((item: any, index: number) => (
        <SwiperSlide key={index} className="">
          <div
            className="flex flex-col items-center rounded-md bg-white p-4 py-8"
            key={index}
          >
            <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-t from-goldie-400 to-goldie-300 text-xl font-bold">
              {initials(item?.name)}
            </div>
            <h3 className="mb-1.5 text-lg font-bold">{item?.name}</h3>
            <p className="text-balance text-center text-neutral-700">
              {item?.comment}
            </p>
            <span className="mt-6 inline-block">
              <BsFacebook size={24} />
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSlider;
