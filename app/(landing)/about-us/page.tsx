import Image from "next/image";
import React from "react";
import Founder from "@/public/assets/about-us/founder.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BrandSlider from "@/components/about-components/BrandSlider";
import TeamSlider from "@/components/about-components/TeamSlider";
import ReviewSlider from "@/components/about-components/ReviewSlider";
import AboutImg from "@/public/assets/abt-img.jpg";
import { Metadata } from "next";

const pageTitle = "About Us";

export const metadata: Metadata = {
  title: pageTitle,
};

const AboutUs = () => {
  return (
    <>
      {/* ====== ABOUT BANNER ====== */}
      <section
        // style={{
        //   backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url(${AboutImg.src})`,
        // }}
        className="relative flex aspect-[3/1] w-full items-center justify-center py-20"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 to-black/50"></div>

        <Image
          src={AboutImg}
          alt="image banner"
          placeholder="blur"
          fill
          priority
          className="absolute left-0 top-0 -z-50 object-cover object-center"
        />

        <div className="wrapper flex flex-col items-center text-center">
          <h1 className="mb-2 text-2xl font-bold text-brand-100 sm:text-4xl lg:text-5xl">
            About us
          </h1>
          <p className="w-3/4 font-normal text-brand-100 lg:max-w-2xl  lg:text-2xl">
            Everything you need to know about this Cake App.
          </p>
        </div>
      </section>

      {/* ========= OUR COMPANY ============ */}
      <section className="py-6 md:py-10 lg:py-20">
        <div className="wrapper">
          <div className="flex flex-col items-center justify-center gap-4 py-5 sm:px-10 md:gap-6">
            <div className="inline-block">
              <h2 className="inline-block text-xl font-bold uppercase text-brand-200 md:text-2xl">
                Our Company
              </h2>
              <span className="block h-0.5 w-[60px] bg-brand-200"></span>
            </div>
            <p className="max-w-[924px] text-center text-brand-200">
              This Cake App offers a wide range of cakes for different occasions.
              Whether you seek a whimsical unicorn cake for your child&apos;s
              birthday, an elegant tiered cake for a lavish wedding, or a
              heartfelt heart-shaped cake for a romantic anniversary, The Cake App has
              the perfect choice for you. Our cakes embody more than just
              exceptional taste; they symbolize personal emotions, celebrating
              love, joy, and treasured memories.
            </p>
          </div>
        </div>
      </section>

      {/* ========= OUR FOUNDER ============ */}
      <section className="bg-brand-200">
        <h2 className="py-4 text-center text-xl font-semibold uppercase text-brand-100 lg:text-2xl">
          Our Founder
        </h2>

        <div className="bg-brand-200 py-10 lg:py-8">
          <div className="wrapper sm:grid sm:grid-cols-2 sm:items-center md:grid-cols-[1.5fr_2fr]">
            <div className="flex items-center justify-center">
              <Image src={Founder} alt="our-founder" className="w-1/2" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-brand-100 md:text-3xl">
                Mrs Goldis Confectinery
              </h3>
              <span className="text-base italic text-brand-100 md:text-lg">
                Professional Baker
              </span>
              <p className="mt-2 text-balance text-brand-100 lg:leading-[160%]">
                Mrs Goldis Confectionery combines 15 years of baking expertise
                with a passion for creating memorable celebrations. Each cake
                reflects our commitment to quality and joy, ensuring every
                moment with Goldis is unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========= OUR TEAM ============ */}
      <section className="py-10">
        <div className="wrapper">
          <div className="mb-3 flex flex-col items-center justify-center">
            <div className="inline-block">
              <h2 className="inline-block text-2xl font-bold uppercase text-brand-200">
                Meet the team
              </h2>
              <span className="block h-0.5 w-[60px] bg-brand-200"></span>
            </div>
          </div>
          <div className="team mt-10 w-full">
            <TeamSlider />
          </div>
        </div>
      </section>

      {/* ========= OUR REVIEWS ============ */}
      <section className="bg-brand-200 py-10">
        <div className="wrapper team new">
          <h2 className="mb-8 text-balance py-4 text-center text-2xl font-semibold uppercase text-brand-100">
            What Customers said about goldies
          </h2>
          <ReviewSlider />
        </div>
      </section>

      {/* ========= OUR BRANDS ============ */}
      <section className="py-10">
        <div className="wrapper">
          <div className="mb-3 flex flex-col items-center justify-center">
            <div className="inline-block">
              <h2 className="inline-block text-2xl font-bold uppercase">
                Brands we&apos;ve worked with
              </h2>
              <span className="block h-0.5 w-[60px] bg-brand-200"></span>
            </div>
          </div>

          <div className="xl:mx-w-[1000px] w-full py-7 xl:mx-auto">
            <BrandSlider />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
