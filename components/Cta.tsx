"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cta1 from "../public/assets/cta.png";
import { Button } from "./ui/button";

const Cta = () => {
  const router = useRouter();
  return (
    <>
      <section
        className="relative flex h-[250px] w-full items-center justify-center  py-10 md:hidden"
        style={{
          backgroundImage: `url(${Cta1.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>

        <div className="wrapper z-[1] flex flex-col items-center justify-center gap-4 ">
          <h2 className="text-balance text-center text-3xl font-bold">
            Experience the Joy in Every Bite
          </h2>
          <Button
            size={"lg"}
            onClick={() => router.push("/shop")}
            className="text-goldie-300"
          >
            Order Cake now
          </Button>
        </div>
      </section>

      <section className="mb-10 hidden md:flex">
        <div className="wrapper">
          <div className="grid h-[300px] grid-cols-2 overflow-hidden rounded-2xl lg:h-[400px]">
            <div className="relative h-full w-full">
              <Image
                src={Cta1}
                alt="hero cake"
                sizes="(max-width: 1024px) 33vw"
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
                size={"lg"}
                onClick={() => router.push("/shop")}
                className="mt-4 text-goldie-300"
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
