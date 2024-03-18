"use client";
import Image from "next/image";
import Cake1 from "../public/assets/about.webp";
import Cake2 from "../public/assets/about2.webp";
import Link from "next/link";

const About = () => {
  return (
    <>
      <section
        id="about"
        className="bg-gradient-to-br from-black to-neutral-700 py-16 pt-20"
      >
        <div className="wrapper">
          <div className="flex flex-wrap items-start justify-between md:grid md:grid-cols-2 md:gap-5">
            <div
              data-aos="fade-right"
              className="mb-6 h-[250px] w-full md:mb-0 md:h-[350px] "
            >
              <Image
                src={Cake1}
                alt="Vercel Logo"
                className="mx-auto h-full w-full object-cover lg:w-[80%]"
              />
            </div>
            <div data-aos="fade-left" data-aos-delay="500" className="w-full">
              <p className="leading-[150%] text-main lg:text-xl lg:leading-10">
                <strong>
                  Goldis isn&apos;t just a bakery, it&apos;s a haven for
                  happiness.
                </strong>{" "}
                Our cakes and treats are not just desserts, they are a canvas
                for memories, a symphony of flavors, and the perfect complement
                to life&apos;s sweetest moments.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-block rounded-[50px] bg-main px-8 py-3 font-bold"
              >
                Shop Our Cake
              </Link>
            </div>
          </div>
          <hr className="my-8 border-0 border-t-2 border-main md:my-12 lg:my-16" />
          <div className="flex flex-wrap items-start justify-between md:grid md:grid-cols-2 md:gap-9">
            <div
              data-aos="fade-left"
              data-aos-delay="500"
              className="mb-6 h-[250px] w-full md:order-2 md:mb-0 md:h-[350px]"
            >
              <Image
                src={Cake2}
                alt="Vercel Logo"
                className="mx-auto h-full w-full object-cover md:w-[80%]"
              />
            </div>
            <div data-aos="fade-right" className="w-full md:order-1">
              <p className="leading-[150%] text-main lg:text-xl lg:leading-10">
                <strong>This vision is not just about sugar and flour,</strong>{" "}
                It’s about creating moments of joy and sweetness, fostering
                connections, and leaving a lasting legacy. Join us in making the
                world a sweeter place, one bite at a time.
              </p>
              <Link
                href="/bespoke"
                className="mt-4 inline-block rounded-[50px] bg-main px-8 py-3 font-bold"
              >
                Bespoke Cakes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
