import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { initials } from "@/helper/initials";
import { BsFacebook, BsStarFill, BsStarHalf, BsTwitterX } from "react-icons/bs";
import { cn } from "@/helper/cn";

const reviews = [
  {
    client: "Sarah Johnson",
    title: "Deliciously Decadent Treat!",
    comment:
      "Goldis Cake offers a delightful range of flavors and textures. Each bite is like a symphony of sweetness that melts in your mouth. Simply divine!",
    platform: "Facebook",
  },
  {
    client: "Michael Chang",
    title: "Sensational Sweetness in Every Slice!",
    comment:
      "Goldis Cake truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true!",
    platform: "twitter",
  },
  {
    client: "Emily Rodriguez",
    title: "Heavenly Indulgence on a Plate!",
    comment:
      "Indulging in Goldis Cake is like taking a trip to dessert paradise. The cakes are moist, the toppings are scrumptious, and every bite is a taste sensation. Pure bliss!",
    platform: "Facebook",
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
      {reviews?.map((review: any, index: number) => {
        const delay = index * 100;
        // console.log(delay, "delay");
        if (index > 2) return;
        return (
          <SwiperSlide key={index} className="">
            {/* <div
            className="flex flex-col items-center rounded-md bg-brand-100 p-4 py-8"
            key={index}
          >
            <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 text-xl font-semibold text-brand-100">
              {initials(item?.name)}
            </div>
            <h3 className="mb-1.5 text-lg font-bold">{item?.name}</h3>
            <p className="text-balance text-center text-brand-200">
              {item?.comment}
            </p>
            <span className="mt-6 inline-block">
              <BsFacebook size={24} />
            </span>
          </div> */}

            <blockquote
              data-aos="fade-right"
              data-aos-delay={delay}
              key={index}
              className={`relative rounded-md border border-neutral-300 bg-white p-7 hover:shadow-md`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 text-xl font-semibold text-brand-100">
                    {initials(review.client)}
                  </span>
                  <span
                    className={cn(
                      "absolute -right-2 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white text-white",
                      review?.platform === "Facebook" && "bg-blue-700",
                      review?.platform === "twitter" && "bg-neutral-900",
                    )}
                  >
                    {review?.platform === "Facebook" && (
                      <BsFacebook size={14} />
                    )}
                    {review?.platform === "twitter" && <BsTwitterX size={14} />}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold leading-[1.5]">
                    {review.client}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <BsStarFill size={18} className="text-orange-500" />
                    <BsStarFill size={18} className="text-orange-500" />
                    <BsStarFill size={18} className="text-orange-500" />
                    <BsStarFill size={18} className="text-orange-500" />
                    <BsStarHalf size={18} className="text-orange-500" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center leading-[150%]">
                {review.comment}
              </p>
            </blockquote>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ReviewSlider;
