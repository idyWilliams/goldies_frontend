"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CakeCategory from "@/components/CakeCategory";
import MileStoneCakes from "@/components/MileStoneCakes";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Layout from "@/components/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

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
        <main className="overflow-hidden">
          <Hero />
          <About />
          <CakeCategory />
          <MileStoneCakes />
          <Testimonials />
          <Contact />
        </main>
      </Layout>
    </>
  );
};

export default Home;
