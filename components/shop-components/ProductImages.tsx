import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as ISwiper } from "swiper/types";
import { Navigation, Thumbs, FreeMode, Zoom } from "swiper/modules";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Placeholder from "@/public/assets/placeholder3.png";
import { IProduct } from "@/interfaces/product.interface";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { ChevronLeftIcon, ChevronRightIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

const exampleImage =
  "https://firebasestorage.googleapis.com/v0/b/goldie-b3ba7.appspot.com/o/products%2Fbanana-cake-with-cinnamon-cream-102945-1.webp?alt=media&token=32e645da-9327-4f7f-9f79-a2cba1102676";

const ProductImages = ({ product }: { product: IProduct }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [mainSwiperInstance, setMainSwiperInstance] = useState<ISwiper | null>(
    null,
  );
  const [mainThumbsSwiper, setMainThumbsSwiper] = useState<ISwiper | null>(
    null,
  );
  const [isZoomed, setIsZoomed] = useState(false);

  // Refs for custom navigation buttons
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handleImageChange = (newImage: number) => {
    setSelectedImageIndex(newImage);
    if (mainSwiperInstance) {
      mainSwiperInstance.slideTo(newImage);
    }
  };

  const toggleZoom = () => {
    if (mainSwiperInstance) {
      if (isZoomed) {
        mainSwiperInstance.zoom.out(); // Zoom out
      } else {
        mainSwiperInstance.zoom.in(); // Zoom in
      }
      setIsZoomed(!isZoomed); // Toggle zoom state
    }
  };
  return (
    <div className="w-full">
      {/* main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <Swiper
          spaceBetween={2}
          modules={[Navigation, Thumbs, FreeMode, Zoom]}
          navigation={{
            nextEl: nextButtonRef.current,
            prevEl: prevButtonRef.current,
          }}
          initialSlide={selectedImageIndex}
          thumbs={{ swiper: mainThumbsSwiper }}
          zoom={true}
          onSlideChange={(swiper) => {
            setSelectedImageIndex(swiper.activeIndex);
            if (mainThumbsSwiper) {
              mainThumbsSwiper.slideTo(swiper.activeIndex);
            }
          }}
          onSwiper={(swiper) => setMainSwiperInstance(swiper)}
          className="h-full w-full"
        >
          {product?.images.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="swiper-zoom-container">
                <div className="h-full w-full">
                  {!isLoaded && (
                    <Image
                      src={Placeholder}
                      alt="placeholder for image"
                      placeholder="blur"
                      width={500}
                      height={500}
                      className="h-full w-full animate-pulse object-cover object-center"
                    />
                  )}
                  <Image
                    src={image ? image : exampleImage}
                    alt={product.slug}
                    width={500}
                    height={500}
                    className={`h-full w-full object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={(e) => {
                      console.error("Image failed to load", e);
                      setIsLoaded(true); // Fallback to the placeholder or example image
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          ref={prevButtonRef}
          className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/75 disabled:hidden md:flex"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          ref={nextButtonRef}
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/75 disabled:hidden md:flex"
        >
          <ChevronRightIcon className="size-4" />
        </button>

        <button
          className="absolute bottom-4 right-4 z-10 cursor-zoom-in rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75"
          onClick={toggleZoom}
        >
          {isZoomed ? (
            <ZoomOutIcon className="size-6" /> // Show zoom out icon when zoomed
          ) : (
            <ZoomInIcon className="size-6" /> // Show zoom in icon when not zoomed
          )}
        </button>
      </div>

      {/* thumbnails images */}
      <div className="w-full h-[100px] flex items-center">
        <Swiper
          onSwiper={setMainThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="w-full"
          breakpoints={{
            320: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {product?.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className={`h-20 w-full cursor-pointer overflow-hidden rounded-md border-2 ${
                  selectedImageIndex === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => handleImageChange(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={56}
                  className={`h-full w-full object-cover transition-opacity duration-300 ${
                    selectedImageIndex === index ? "" : "opacity-50"
                  }`}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductImages;
