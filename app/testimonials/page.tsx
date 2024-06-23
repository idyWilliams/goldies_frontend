"use client";
import { initials } from "@/helper/initials";
import Image from "next/image";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Img from "../../public/assets/reviews.png";
import Layout from "@/components/Layout";
import Link from "next/link";
import { chunkArray } from "@/helper/chunkArray";
import { useState } from "react";
import Pagination from "@/components/custom-filter/Pagination";

const reviews = [
  {
    client: "Emily Rodriguez",
    title: "Heavenly Indulgence on a Plate!",
    comment:
      "Indulging in Goldis Cake is like taking a trip to dessert paradise. The cakes are moist, the toppings are scrumptious, and every bite is a taste sensation. Pure bliss!",
  },
  {
    client: "David Patel",
    title: "Irresistibly Tempting Treats!",
    comment:
      "Goldis Cake crafts cakes that are impossible to resist. From the first glance to the last crumb, their creations are a feast for the eyes and the taste buds. Simply irresistible!",
  },
  {
    client: "Lisa Thompson",
    title: "A Symphony of Sweet Flavors!",
    comment:
      "Goldis Cake masters the art of blending flavors to perfection. With every forkful, you're transported to a world of sweetness and delight. A must-try for any dessert enthusiast!",
  },
  {
    client: "Sarah Johnson",
    title: "Deliciously Decadent Treat!",
    comment:
      "Goldis Cake offers a delightful range of flavors and textures. Each bite is like a symphony of sweetness that melts in your mouth. Simply divine!",
  },
  {
    client: "Michael Chang",
    title: "Sensational Sweetness in Every Slice!",
    comment:
      "Goldis Cake truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true!",
  },
  {
    client: "Emily Rodriguez",
    title: "Heavenly Indulgence on a Plate!",
    comment:
      "Indulging in Goldis Cake is like taking a trip to dessert paradise. The cakes are moist, the toppings are scrumptious, and every bite is a taste sensation. Pure bliss!",
  },
  {
    client: "David Patel",
    title: "Irresistibly Tempting Treats!",
    comment:
      "Goldis Cake crafts cakes that are impossible to resist. From the first glance to the last crumb, their creations are a feast for the eyes and the taste buds. Simply irresistible!",
  },
  {
    client: "Lisa Thompson",
    title: "A Symphony of Sweet Flavors!",
    comment:
      "Goldis Cake masters the art of blending flavors to perfection. With every forkful, you're transported to a world of sweetness and delight. A must-try for any dessert enthusiast!",
  },
  {
    client: "Kevin Nguyen",
    title: "Pure Perfection in Every Bite!",
    comment:
      "Goldis Cake elevates the cake experience to new heights. Each creation is a masterpiece of taste and texture, leaving you craving more. It's perfection on a plate!",
  },
];

let itemsPerPage = 6;
const Testimonials = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const handleNext = () => {
    if (currentPageIndex !== chunkArray(reviews, itemsPerPage).length) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  const handlePaginateClick = (index: number) => {
    setCurrentPageIndex(index + 1);
    window.scroll(0, 0);
  };

  const handlePrev = () => {
    if (currentPageIndex !== 1) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };
  return (
    <Layout>
      <section className="bg-neutral-200 pb-10">
        <div className="relative mt-[64px] h-[200px] w-full md:h-[300px]">
          <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4">
            <h1 className="text-2xl font-bold text-white md:text-3xl lg:mb-2 lg:text-5xl">
              Customer Reviews
            </h1>
            <p className="text-white"> Customers reviews on our products</p>
            <div className="mt-4">
              <Link href={"/"} className="text-white">
                Home
              </Link>{" "}
              <span className="text-white">-</span>{" "}
              <Link href={"/testimonials"} className="text-goldie-300">
                Testimonial
              </Link>
            </div>
          </div>

          <Image
            src={Img}
            alt="banner"
            width={1000}
            height={400}
            className="absolute left-0 top-0 z-10 h-full w-full object-cover object-center"
          />

          <div className="absolute left-0 top-0 z-[11] h-full w-full bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.5))]"></div>
        </div>
        <div className="wrapper">
          <div className="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {chunkArray(reviews, itemsPerPage)[currentPageIndex - 1]?.map(
              (review: any, index: any) => {
                return (
                  <blockquote
                    key={index}
                    className={`rounded-md border border-neutral-300 bg-white p-7 hover:shadow-md
                `}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#b6a650] to-goldie-300 text-xl font-bold">
                        {initials(review.client)}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold leading-[1.5]">
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
                    <p className="mt-4 leading-[150%]">{review.comment}</p>
                  </blockquote>
                );
              },
            )}
          </div>

          <Pagination
            className="mx-auto bg-transparent"
            onNext={handleNext}
            onPrev={handlePrev}
            onPaginateClick={handlePaginateClick}
            itemsPerPage={itemsPerPage}
            currentPageIndex={currentPageIndex}
            arr={reviews}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
