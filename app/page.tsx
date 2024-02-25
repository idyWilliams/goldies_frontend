import Hero from "@/components/Hero";
import About from "@/components/About";
import CakeCategory from "@/components/CakeCategory";
import MileStoneCakes from "@/components/MileStoneCakes";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Layout from "@/components/Layout";
const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <About />
        <CakeCategory />
        <MileStoneCakes />
        <Testimonials />
        <Contact />
      </Layout>
    </>
  );
};

export default Home;
