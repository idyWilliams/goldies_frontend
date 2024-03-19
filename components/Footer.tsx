import Link from "next/link";
import Image from "next/image";
import LinkedIn from "../public/assets/linkedin.svg";
import Phone from "../public/assets/phone.svg";
import Instagram from "../public/assets/instagram.svg";
import Youtube from "../public/assets/youtube.svg";
import { BsChevronRight } from "react-icons/bs";

const Footer = () => {
  return (
    <section className="relative flex min-h-[500px] w-full items-center justify-center py-16">
      <div className="wrapper relative z-30">
        <h2 className="mb-8 text-center text-2xl font-bold capitalize text-main md:text-3xl">
          Connect with me
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:mx-auto md:w-[700px]">
          <div className="flex items-center gap-5 rounded-lg bg-main p-3">
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

          <div className="flex items-center gap-5 rounded-lg bg-main p-3">
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

          <div className="flex items-center gap-5 rounded-lg bg-main p-3">
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

          <div className="flex items-center gap-5 rounded-lg bg-main p-3">
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
