"use client";
import Image from "next/image";
import MilestoneCake from "../public/assets/milestone-cake.webp";
import KidCake from "../public/assets/kid-cake.webp";
import Cupcakes from "../public/assets/cupcake.webp";
import WeddingCake from "../public/assets/wedding-cake.webp";
import Link from "next/link";
import EachElement from "@/helper/EachElement";
import { categories } from "@/utils/cakeCategories";

const CakeCategory = () => {
  return (
    <section className="bg-goldie-300 relative overflow-hidden py-16">
      <div className="wrapper relative z-20">
        <div className="grid grid-cols-2 items-start justify-between gap-4 gap-y-8 md:grid-cols-4">
          <EachElement
            of={categories}
            render={(item: any, index: number) => (
              <figure
                className="w-full"
                data-aos="fade-down"
                data-aos-delay={`${index * 200}`}
              >
                <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
                  <Image
                    src={item.image}
                    alt={item.value}
                    className="mx-auto h-full w-full rounded-md object-cover"
                  />
                </div>

                <figcaption className="mt-2 text-center text-lg font-bold text-neutral-800">
                  <Link href={`/shop/categories/${item.value}`}>
                    {item.label}
                  </Link>
                </figcaption>
              </figure>
            )}
          />
          {/* 
          <figure className="w-full" data-aos="fade-down" data-aos-delay="200">
            <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
              <Image
                src={KidCake}
                alt="Kids Cake"
                className="mx-auto h-full w-full rounded-md object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-lg font-bold text-neutral-800">
              <Link href="/shop">Kids Cakes</Link>
            </figcaption>
          </figure>
          <figure className="w-full" data-aos="fade-down" data-aos-delay="400">
            <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
              <Image
                src={Cupcakes}
                alt="cupcakes"
                className="mx-auto h-full w-full rounded-md object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-lg font-bold text-neutral-800">
              <Link href="/shop">Cupcakes</Link>
            </figcaption>
          </figure>
          <figure className="w-full" data-aos="fade-down" data-aos-delay="600">
            <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
              <Image
                src={WeddingCake}
                alt="Wedding Cake"
                className="mx-auto h-full w-full rounded-md object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-lg font-bold text-neutral-800">
              <Link href="/shop">Wedding Cakes</Link>
            </figcaption>
          </figure> */}
        </div>
        <div className="mt-12 md:mx-auto md:w-11/12 md:text-center lg:mx-0 lg:w-8/12 lg:text-left">
          <h2 className="mb-3 text-[28px] font-bold" data-aos="fade">
            Cakes that celebrate every milestone
          </h2>
          <p className="md:text-lg lg:text-xl lg:leading-9" data-aos="fade-up">
            Goldis offers a wide range of cakes for different occasions. Whether
            you need a fun unicorn cake’ for your child&apos;s birthday, an
            impressive tiered cake for a grand wedding, or a simple heart-shaped
            cake for a romantic anniversary, Goldis has got you covered. Our
            cakes are not just about taste, but also about expressing personal
            sentiments. Each cake represents love, laughter, and cherished
            memories.
          </p>
        </div>
      </div>

      {/* VIDEO BACKGROUND */}
      <div className="before:bg-goldie-300 absolute right-0 top-0 h-full w-full before:absolute before:left-0 before:top-0 before:z-10 before:block before:h-full before:w-full before:bg-opacity-75 md:w-5/12">
        <video
          width="320"
          height="350"
          autoPlay
          muted
          loop
          className="absolute left-0 top-0 h-full w-full object-cover"
          preload="auto"
        >
          <source src="/assets/stir.webm" type="video/webm" />
          <source src="/assets/stir.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default CakeCategory;
