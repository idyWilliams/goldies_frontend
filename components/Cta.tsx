"use client";
// import Image from "next/image";
// import Cake1 from "../public/assets/about.webp";
// import Cake2 from "../public/assets/about2.webp";
// import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const Cta = () => {
  const router = useRouter();
  return (
    <>
      <section className="cta-bg mb-10 flex h-[250px] w-full items-center justify-center bg-cover bg-center py-10 md:hidden">
        <div className="wrapper flex flex-col items-center justify-center gap-4 ">
          <h2
            data-aos="fade-up"
            className="text-balance text-center text-3xl font-bold"
          >
            Experience the Joy in Every Bite
          </h2>
          <Button
            data-aos="fade-up"
            data-aos-delay={300}
            onClick={() => router.push("/shop")}
            className="group h-auto w-min overflow-hidden px-6 py-4 text-goldie-300"
          >
            Order Cake now{" "}
            <span className="origin-right translate-x-[40px] duration-300 ease-linear group-hover:translate-x-4">
              <ChevronRight />
            </span>
          </Button>
        </div>
      </section>
      <section className="mb-10 hidden md:block">
        <div className="wrapper">
          <div className="grid h-[300px] grid-cols-2 overflow-hidden rounded-2xl lg:h-[400px]">
            <div className="cta1 h-full w-full bg-cover bg-center"></div>
            <div className="cta2 flex h-full w-full flex-col items-center justify-center bg-cover bg-center">
              <h2 className="text-balance text-center text-3xl font-bold xl:w-[68%]">
                Experience the Joy in Every Bite
              </h2>
              <Button
                onClick={() => router.push("/shop")}
                className="group mt-4 h-auto w-min overflow-hidden px-6 py-4 text-goldie-300"
              >
                Order Cake now{" "}
                <span className="origin-right translate-x-[40px] duration-300 ease-linear group-hover:translate-x-4">
                  <ChevronRight />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cta;
