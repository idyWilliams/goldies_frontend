"use client";
import { cn } from "@/helper/cn";
import { Facebook } from "iconsax-react";
import Link from "next/link";
import { platform } from "os";
import { useState } from "react";
import { BsFacebook, BsStarFill, BsStarHalf, BsTwitterX } from "react-icons/bs";
import { Button } from "./ui/button";

const reviews = [
  {
    client: "Sarah Johnson",
    title: "Deliciously Decadent Treat!",
    comment:
      "Cake App offers a delightful range of flavors and textures. Each bite is like a symphony of sweetness that melts in your mouth. Simply divine!",
    platform: "Facebook",
  },
  {
    client: "Michael Chang",
    title: "Sensational Sweetness in Every Slice!",
    comment:
      "Cake App truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true!",
    platform: "twitter",
  },
  {
    client: "Emily Rodriguez",
    title: "Heavenly Indulgence on a Plate!",
    comment:
      "Indulging in Cake App is like taking a trip to dessert paradise. The cakes are moist, the toppings are scrumptious, and every bite is a taste sensation. Pure bliss!",
    platform: "Facebook",
  },
  {
    client: "David Patel",
    title: "Irresistibly Tempting Treats!",
    comment:
      "Cake App crafts cakes that are impossible to resist. From the first glance to the last crumb, their creations are a feast for the eyes and the taste buds. Simply irresistible!",
    platform: "twitter",
  },
  {
    client: "Lisa Thompson",
    title: "A Symphony of Sweet Flavors!",
    platform: "Facebook",
    comment:
      "Cake App masters the art of blending flavors to perfection. With every forkful, you're transported to a world of sweetness and delight. A must-try for any dessert enthusiast!",
  },
  {
    client: "Kevin Nguyen",
    title: "Pure Perfection in Every Bite!",
    comment:
      "Cake App elevates the cake experience to new heights. Each creation is a masterpiece of taste and texture, leaving you craving more. It's perfection on a plate!",
    platform: "twitter",
  },
];

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const clientInitails = (name: string) => {
    const value = name.split(" ");
    let initials: string = "";
    value.forEach((el) => {
      initials += el.slice(0, 1);
    });

    return initials;
  };

  return (
    <>
      <section id="testimonials" className=" bg-brand-200 py-16">
        <div className="wrapper">
          <h2
            data-aos="fade-down"
            className="text-center text-2xl font-semibold capitalize text-brand-100  md:text-center  md:text-3xl "
          >
            What our Customers said about The Cake App
          </h2>

          <div className="pb-10 pt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
              {reviews.map((review: any, index: number) => {
                const delay = index * 100;
                // console.log(delay, "delay");
                if (index > 2) return;
                return (
                  <blockquote
                    data-aos="fade-right"
                    data-aos-delay={delay}
                    key={index}
                    className={`relative rounded-md border border-neutral-300 bg-white p-7 hover:shadow-md
                ${hoveredIndex === index ? "" : ""}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 text-xl font-semibold text-brand-100">
                          {clientInitails(review.client)}
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
                          {review?.platform === "twitter" && (
                            <BsTwitterX size={14} />
                          )}
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
                );
              })}
            </div>

            <Link href={'/testimonials'}>
              <Button
                variant={"outline"}
                className="mx-auto mt-10 block h-auto w-[150px] border border-brand-100 bg-transparent py-3 text-base font-normal uppercase text-brand-100 "
              >
                View More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
