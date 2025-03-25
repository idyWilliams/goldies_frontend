import ContactUsForm from "@/components/ContactUsForm";
import Logo from "@/public/assets/new-logo/logo-white.svg";
import Img from "@/public/assets/reviews.png";
import { Call, Location, Sms } from "iconsax-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const pageTitle = "Contact Us";

export const metadata: Metadata = {
  title: pageTitle,
};

export default function ContactPage() {
  return (
    <section className="pt-16">
      <div className="relative h-[200px] w-full md:h-[300px]">
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:mb-2 lg:text-5xl">
            Contact Us
          </h1>
          <p className="text-center text-white">
            Please contact us if you have any question or concerns
          </p>
          <div className="mt-4">
            <Link href={"/"} className="text-white">
              Home
            </Link>{" "}
            <span className="text-white">-</span>{" "}
            <Link href={"/contact"} className="text-brand-200">
              Contact Us
            </Link>
          </div>
        </div>

        <Image
          src={Img}
          alt="banner"
          width={1000}
          height={400}
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-center"
        />
      </div>
      <div className=" bg-neutral-300">
        <div className="mx-auto grid gap-5 px-4 py-16 md:grid-cols-[300px_1fr] lg:w-[800px]  xl:w-[1000px]">
          <div className="flex flex-col justify-center bg-brand-200 px-10 pb-14 pt-10 md:rounded-md">
            <h3 className="mb-2 text-[24px] font-semibold text-brand-100">
              Opening Hours
            </h3>
            <p className="text-[16px] text-brand-100">
              Mondays - Fridays 8am-6pm
            </p>
            <div className="mt-5 flex items-center justify-center gap-7 text-brand-100">
              <div className="flex flex-col items-start space-y-7">
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Call />
                  </span>
                  <a
                    href="tel:+447488855300"
                    className="text-[14px] hover:underline"
                  >
                    +447488855300
                  </a>
                </div>
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Sms />
                  </span>
                  <a
                    href="mailto:johndoe@gmail.com"
                    className="text-[14px] hover:underline"
                  >
                    johndoe@gmail.com
                  </a>
                </div>
                <div className="inline-flex items-start gap-5">
                  <span>
                    <Location />
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=37+Wallenger+Avenue,+Romford,+Essex,+England,+RM2+6EP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-balance text-[14px] hover:underline"
                  >
                    37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-7"></div>
            </div>
            <Image
              src={Logo}
              alt="logo"
              width={100}
              height={100}
              className="mx-auto mt-20 hidden h-auto w-[80%] opacity-80 md:block"
            />
          </div>
          <div className=" bg-white px-4 py-8 md:rounded-md xl:px-10">
            <h3 className="mb-5 text-center text-[24px] font-bold text-brand-200">
              Contact Us
            </h3>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </section>
  );
}
