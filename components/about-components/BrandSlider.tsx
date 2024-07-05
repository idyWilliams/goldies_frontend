import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Spotify from "../../public/assets/about-us/spotify.png";
import Edge from "../../public/assets/about-us/edge.png";
import Google from "../../public/assets/about-us/google.png";
import Microsoft from "../../public/assets/about-us/microsoft.png";
import Airbnb from "../../public/assets/about-us/airbnb.png";
import Slack from "../../public/assets/about-us/slack.png";

const brands = [Google, Slack, Edge, Spotify, Microsoft, Airbnb];

const BrandSlider = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      // pagination={{
      //   clickable: true,
      // }}
      modules={[Autoplay]}
      className="mySwiper"
      breakpoints={{
        300: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }}
    >
      {brands?.map((img: any, index: number) => (
        <SwiperSlide key={index}>
          <div className="flex w-full justify-center">
            <Image
              src={img}
              alt={`img-${index}`}
              width={100}
              height={50}
              className={"mx-auto inline-block w-[130px]"}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandSlider;
