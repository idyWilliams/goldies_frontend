"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CakeCategory from "@/components/CakeCategory";
import MileStoneCakes from "@/components/MileStoneCakes";
import Testimonials from "@/components/Testimonials";
import Layout from "@/components/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LandPage from "@/components/LandPage";

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
        <div className="mt-[64px] lg:mt-[80px]" />
        <main className="overflow-hidden">
          <LandPage />
          <Hero />
          <About />
          <CakeCategory />
          <MileStoneCakes />
          <Testimonials />
        </main>
      </Layout>
    </>
  );
};

export default Home;
