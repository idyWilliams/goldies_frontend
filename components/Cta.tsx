"use client";
import Image from "next/image";
import Cake1 from "../public/assets/about.webp";
import Cake2 from "../public/assets/about2.webp";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cta1 from "../public/assets/cta.png";

const Cta = () => {
  const router = useRouter();
  return (
    <>
      <section className="flex h-[250px] w-full items-center justify-center bg-red-300 py-10 md:hidden">
        <Image
          src={Cta1}
          alt="hero cake"
          fill
          priority
          className="absolute -z-50 object-cover object-center"
          placeholder="blur"
        />
        <div className="wrapper flex flex-col items-center justify-center gap-4 ">
          <h2 className="text-balance text-center text-3xl font-bold">
            Experience the Joy in Every Bite
          </h2>
          <Button
            onClick={() => router.push("/shop")}
            className="h-auto px-6 py-4 text-goldie-300"
          >
            Order Cake now
          </Button>
        </div>
      </section>

      <section className=" mb-10">
        <div className="wrapper">
          <div className="grid h-[300px] grid-cols-2 overflow-hidden rounded-2xl lg:h-[400px]">
            <div className="relative h-full w-full">
              <Image
                src={Cta1}
                alt="hero cake"
                fill
                priority
                className="absolute  object-cover object-center"
                placeholder="blur"
              />
            </div>
            <div className="cta2 flex h-full w-full flex-col items-center justify-center bg-cover bg-center">
              <h2 className="text-balance text-center text-3xl font-bold xl:w-[68%]">
                Experience the Joy in Every Bite
              </h2>
              <Button
                onClick={() => router.push("/shop")}
                className="mt-4 h-auto px-6 py-4 text-goldie-300"
              >
                Order Cake now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cta;
