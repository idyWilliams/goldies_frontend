"use client";
import Hero from "@/components/Hero";
import CakeCategory from "@/components/CakeCategory";
import Testimonials from "@/components/Testimonials";
import Layout from "@/app/(landing)/layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FeaturedProducts from "@/components/FeaturedProducts";
import Cta from "@/components/Cta";
// import { mergeSampleCart } from "@/lib/test";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);
  return (
    <>
      <Layout>
        <div className="" />
        <main className="">
          <Hero />

          <CakeCategory />
          <FeaturedProducts />
          <Testimonials />
          <Cta />
        </main>
      </Layout>
    </>
  );
};

export default Home;
