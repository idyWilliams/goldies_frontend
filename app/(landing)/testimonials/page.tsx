import Image from "next/image";
import Img from "@/public/assets/reviews.png";

import Link from "next/link";
import { Metadata } from "next";
import TestimonialComp from "@/components/TestimonialComp";

const pageTitle = "Customer Reviews";

export const metadata: Metadata = {
  title: pageTitle,
};

const Testimonials = () => {
  return (
    <section className="bg-brand-100 pt-16">
      <div className="relative h-[200px] w-full md:h-[300px]">
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:mb-2 lg:text-5xl">
            Customer Reviews
          </h1>
          <p className="text-white"> Customers reviews on our products</p>
          <div className="mt-5">
            <Link href={"/"} className="text-white">
              Home
            </Link>{" "}
            <span className="text-white">-</span>{" "}
            <Link
              href={"/testimonials"}
              className="font-semibold text-brand-100"
            >
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
      <div className="wrapper py-8">
        <TestimonialComp />
      </div>
    </section>
  );
};

export default Testimonials;
