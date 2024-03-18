import Link from "next/link";
const Hero = () => {
  return (
    <section className="bg-main py-16">
      <div className="wrapper">
        <div className="relative h-[350px] w-full md:h-[400px] lg:h-[500px]">
          <video
            width="320"
            height="350"
            autoPlay
            muted
            loop
            className="absolute left-0 top-0 h-full w-full object-cover"
            preload="auto"
          >
            <source src="/assets/home.webm" type="video/webm" />
            <source src="/assets/home.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-20 mt-6 flex h-full w-full flex-col items-center justify-center bg-main bg-opacity-40 p-8 backdrop-blur-sm md:items-start">
            <div className="flex w-full flex-wrap justify-center md:w-9/12 md:justify-start">
              <h1
                data-aos="fade-down"
                data-aos-delay="500"
                className="tagline text-center text-3xl font-bold leading-[48px] md:text-left md:text-4xl md:leading-[150%] lg:text-5xl lg:leading-[153%]"
              >
                Crafting Smiles, One Delicious Moment at a Time
              </h1>
              <Link
                href="/shop"
                data-aos="fade-down"
                className="mt-8 inline-block border-2 border-black px-6 py-3 font-bold shadow-[0_3px_30px_rgba(0,0,0,0.8)] duration-300 hover:border-main hover:bg-main"
              >
                Shop Cakes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
