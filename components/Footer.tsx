import Link from "next/link";
import Image from "next/image";
import Img from "../public/assets/goldis-gold-logo.png";
import LinkedIn from "../public/assets/linkedin.svg";
import Phone from "../public/assets/phone.svg";
import Instagram from "../public/assets/instagram.svg";
import Youtube from "../public/assets/youtube.svg";
import {
  BsChevronRight,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { Call, Facebook, Location, Sms } from "iconsax-react";

const Footer = () => {
  return (
    <section className="relative flex min-h-[500px] w-full pt-3">
      <div className="wrapper relative z-30">
        {/* <h2 className="text-goldie-300 mb-8 text-center text-2xl font-bold capitalize md:text-3xl">
          Connect with me
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:mx-auto md:w-[700px]">
          <div className="bg-goldie-300 flex items-center gap-5 rounded-lg p-3">
            <span className="inline-block">
              <Image src={Youtube} alt="Youtube" className="w-[100px]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#9C8222]">YouTube</h3>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-[#9C8222]"
              >
                Take me there <BsChevronRight />
              </Link>
            </div>
          </div>

          <div className="bg-goldie-300 flex items-center gap-5 rounded-lg p-3">
            <span className="inline-block">
              <Image src={Phone} alt="Phone" className="w-[100px]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#9C8222]">Phone</h3>
              <span className="inline-flex items-center gap-2 font-bold text-[#9C8222]">
                +123(555)1234
              </span>
            </div>
          </div>

          <div className="bg-goldie-300 flex items-center gap-5 rounded-lg p-3">
            <span className="inline-block">
              <Image src={Instagram} alt="Instagram" className="w-[100px]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#9C8222]">Instagram</h3>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-[#9C8222]"
              >
                Take me there <BsChevronRight />
              </Link>
            </div>
          </div>

          <div className="bg-goldie-300 flex items-center gap-5 rounded-lg p-3">
            <span className="inline-block">
              <Image src={LinkedIn} alt="Linkedin" className="w-[100px]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#9C8222]">Linkedin</h3>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-[#9C8222]"
              >
                Take me there <BsChevronRight />
              </Link>
            </div>
          </div>
        </div> */}

        <div className="mx-auto grid gap-6 rounded-2xl bg-[#494848] px-4 py-4 md:max-w-[70%] md:grid-cols-2 md:items-center md:py-6">
          <div>
            <h1 className="text-2xl font-bold text-goldie-300 md:text-[32px]">
              Subscribe to our NewsLetter
            </h1>
            <p className="text-[16px] text-goldie-300">
              Be the first to know about updates on new recipes.
            </p>
          </div>
          <div className="flex h-min items-center rounded-md md:bg-white md:p-2">
            <form
              id="newsLetter"
              className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-center"
            >
              <label htmlFor="email" className="flex-grow">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-input w-full rounded-md border-none bg-white p-3 placeholder:text-sm focus:ring-0 md:w-auto md:py-0"
                />
              </label>
              <button className="mt-2 w-full rounded-md bg-black px-5 py-2 text-goldie-300 md:mt-0 md:w-auto">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-20 grid justify-between gap-y-8 px-4 md:px-10 lg:grid-cols-5">
          <div className="space-y-4">
            <div>
              <Image
                src={Img}
                alt="logo"
                width={100}
                height={100}
                className="mb-3 w-[200px]"
              />
              <p className="text-goldie-300 ">Goldies Confectionary</p>
              <p className="mb-2 text-white">
                Your perfect stop to shop yummy and fluffy cakes
              </p>
            </div>
            <div>
              <h3 className="text-white">Social Media</h3>
              <hr className="w-[35px] border border-goldie-300" />
            </div>
            <div className="flex gap-2 text-white">
              <Link href={""} className="">
                <BsFacebook />
              </Link>
              <Link href={""} className="">
                <BsInstagram />
              </Link>
              <Link href={""} className="">
                <BsTwitterX />
              </Link>
              <Link href={""} className="">
                <BsLinkedin />
              </Link>
            </div>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white md:pl-8">
            <div>
              <h3 className="font-bold text-white">Company</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <Link href={""}>Products</Link>
            <Link href={""}>About Us</Link>
            <Link href={""}>Testimonies</Link>
            <Link href={""}>Contact Us</Link>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="text-white">Products</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <Link href={""}>Birthday Cakes</Link>
            <Link href={""}>Retirement Cakes</Link>
            <Link href={""}>Anniversary Cakes</Link>
            <Link href={""}>Baby Shower Cakes</Link>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Working Hours</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <span>Monday - Friday: 9am-6pm</span>
            <span>Saturdays 9am-4pm</span>
            <span>Sundays closed</span>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Contact Us</h3>
              <hr className="mb-2 w-[35px] border border-goldie-300" />
            </div>
            <div className="flex items-center justify-center gap-7 self-end text-white">
              <div className="flex flex-col items-start space-y-3">
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Call />
                  </span>
                  <span className="text-[14px]">+447488855300</span>
                </div>
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Sms />
                  </span>
                  <span className="text-[14px]">johndoe@gmail.com</span>
                </div>
                <div className="inline-flex gap-5">
                  <span>
                    <Location />
                  </span>
                  <span className="text-balance text-[14px]">
                    37 Wallenger Avenue, Romford, Essex, England, RM2 6EP
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-7"></div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO BACKGROUND */}
      <div className="absolute left-0 top-0 h-full w-full before:absolute before:left-0 before:top-0 before:z-10 before:block before:h-full before:w-full before:bg-black before:bg-opacity-75">
        <video
          width="320"
          height="350"
          autoPlay
          muted
          loop
          className="absolute left-0 top-0 h-full w-full object-cover"
          preload="auto"
        >
          <source src="/assets/footer.webm" type="video/webm" />
          <source src="/assets/footer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Footer;
