"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";
import Founder from "../../public/assets/about-us/founder.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { initials } from "@/helper/initials";
import { CgChevronRight } from "react-icons/cg";
import EachElement from "@/helper/EachElement";
import { BsFacebook } from "react-icons/bs";
import BrandSlider from "@/components/about-components/BrandSlider";
import TeamSlider from "@/components/about-components/TeamSlider";
import ReviewSlider from "@/components/about-components/ReviewSlider";

const AboutUs = () => {
  return (
    <Layout>
      <div className="mt-[64px] lg:mt-20" />
      {/* ====== ABOUT BANNER ====== */}
      <section className="bg-about w-full bg-cover py-20">
        <div className="wrapper flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-white">About us</h1>
          <p className="text-goldie-300">
            Everything you need to know about Goldies Confectionery.
          </p>
        </div>
      </section>

      {/* ========= OUR COMPANY ============ */}
      <section className="py-10">
        <div className="wrapper">
          <div className="lg:mx-auto lg:w-[1000px]">
            <div className="mb-3 flex flex-col items-center justify-center">
              <div className="inline-block">
                <h2 className="inline-block text-2xl font-bold uppercase">
                  Our Company
                </h2>
                <span className="block h-0.5 w-[60px] bg-goldie-300"></span>
              </div>
            </div>
            <p className="text-center lg:text-2xl lg:leading-[160%]">
              Goldis offers a wide range of cakes for different occasions.
              Whether you seek a whimsical unicorn cake for your child&apos;s
              birthday, an elegant tiered cake for a lavish wedding, or a
              heartfelt heart-shaped cake for a romantic anniversary, Goldis has
              the perfect choice for you. Our cakes embody more than just
              exceptional taste; they symbolize personal emotions, celebrating
              love, joy, and treasured memories.
            </p>
          </div>
        </div>
      </section>

      {/* ========= OUR FOUNDER ============ */}
      <section className="bg-goldie-300">
        <h2 className="py-4 text-center text-2xl font-semibold uppercase">
          Our Founder
        </h2>

        <div className="bg-neutral-700 py-5">
          <div className="wrapper sm:grid sm:grid-cols-2 sm:items-center md:grid-cols-[1.5fr_2fr]">
            <>
              <div className="flex items-center justify-center">
                <Image src={Founder} alt="our-founder" className="w-1/2" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-goldie-300 md:text-3xl">
                  Mrs Goldis Confectinery
                </h3>
                <span className="text-base text-goldie-300 md:text-lg">
                  Professional Baker
                </span>
                <p className="mt-2 text-balance text-white md:text-lg lg:text-2xl lg:leading-[160%]">
                  Mrs Goldis Confectionery combines 15 years of baking expertise
                  with a passion for creating memorable celebrations. Each cake
                  reflects our commitment to quality and joy, ensuring every
                  moment with Goldis is unforgettable.
                </p>
              </div>
            </>
          </div>
        </div>
      </section>

      {/* ========= OUR TEAM ============ */}
      <section className="py-10">
        <div className="wrapper">
          <div className="mb-3 flex flex-col items-center justify-center">
            <div className="inline-block">
              <h2 className="inline-block text-2xl font-bold uppercase">
                Meet the team
              </h2>
              <span className="block h-0.5 w-[60px] bg-goldie-300"></span>
            </div>
          </div>
          <div className="team mt-10 w-full">
            <TeamSlider />
          </div>
        </div>
      </section>

      {/* ========= OUR REVIEWS ============ */}
      <section className="bg-goldie-300">
        <h2 className="text-balance py-4 text-center text-2xl font-semibold uppercase">
          What Customers said about goldies
        </h2>

        <div className="bg-neutral-700 py-10">
          <div className="wrapper team new">
            <ReviewSlider />
          </div>
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
              <span className="block h-0.5 w-[60px] bg-goldie-300"></span>
            </div>
          </div>

          <div className="xl:mx-w-[1000px] w-full py-7 xl:mx-auto">
            <BrandSlider />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
