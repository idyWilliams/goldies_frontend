import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header className="bg-main py-5">
        <div className="wrapper flex justify-between">
          <div>Logo</div>

          <div className="hidden gap-5 md:flex">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Shop Cake</Link>
            <Link href="/">Bespoke Cake Order</Link>
            <Link href="/">Testimonials</Link>
            <Link href="/">Contact</Link>
          </div>

          <div>cart</div>
        </div>
      </header>
      {/*  */}
      <div className="bg-gradient-to-br from-black to-neutral-700 py-16">
        <div className="wrapper">
          <div className="flex flex-wrap items-start justify-between md:grid md:grid-cols-2 md:gap-5">
            <div className="mb-6 h-[250px] w-full md:mb-0 md:h-[350px]">
              <Image
                src="/assets/img2.png"
                alt="Vercel Logo"
                className="mx-auto h-full w-full object-cover lg:w-[80%] dark:invert "
                width={100}
                height={24}
                priority
              />
            </div>
            <div className="w-full">
              <p className="leading-[150%] text-main md:text-lg md:leading-10 lg:text-xl">
                <strong>
                  Goldis isn&apos;t just a bakery, it&apos;s a haven for
                  happiness.
                </strong>{" "}
                Our cakes and treats are not just desserts, they are a canvas
                for memories, a symphony of flavors, and the perfect complement
                to life&apos;s sweetest moments.
              </p>
              <button className="mt-4 rounded-[50px] bg-main px-8 py-3 font-bold">
                Shop Our Cake
              </button>
            </div>
          </div>
          <hr className="my-8 border-0 border-t-2 border-main md:my-12 lg:my-16" />
          <div className="flex flex-wrap items-start justify-between md:grid md:grid-cols-2 md:gap-9">
            <div className="mb-6 h-[250px] w-full md:order-2 md:mb-0 md:h-[350px]">
              <Image
                src="/assets/img2.png"
                alt="Vercel Logo"
                className="mx-auto h-full w-full object-cover md:w-[80%] dark:invert"
                width={100}
                height={24}
                priority
              />
            </div>
            <div className="w-full md:order-1">
              <p className="leading-[150%] text-main lg:text-xl lg:leading-10">
                <strong>This vision is not just about sugar and flour,</strong>{" "}
                It’s about creating moments of joy and sweetness, fostering
                connections, and leaving a lasting legacy. Join us in making the
                world a sweeter place, one bite at a time.
              </p>
              <button className="mt-4 rounded-[50px] bg-main px-8 py-3 font-bold">
                Bespoke Cakes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="bg-main py-16">
        <div className="wrapper">
          <div className="grid grid-cols-2 items-start justify-between gap-4 gap-y-8 md:grid-cols-4">
            <figure className="w-full">
              <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full rounded-md object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </div>

              <figcaption className="mt-2 text-center text-lg font-bold text-neutral-800">
                Milestone cakes
              </figcaption>
            </figure>
            <figure className="w-full">
              <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full rounded-md object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </div>
              <figcaption className="mt-3 text-center text-lg font-bold text-neutral-800">
                Kids cakes
              </figcaption>
            </figure>
            <figure className="w-full">
              <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full rounded-md object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </div>
              <figcaption className="mt-3 text-center text-lg font-bold text-neutral-800">
                Cupcakes
              </figcaption>
            </figure>
            <figure className="w-full">
              <div className="h-[200px] w-full overflow-hidden rounded-lg md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full rounded-md object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </div>
              <figcaption className="mt-3 text-center text-lg font-bold text-neutral-800">
                Wedding Cakes
              </figcaption>
            </figure>
          </div>
          <div className="mt-12 md:mx-auto md:w-11/12 md:text-center lg:mx-0 lg:w-8/12 lg:text-left">
            <h2 className="mb-3 text-[28px] font-bold">
              Cakes that celebrate every milestone
            </h2>
            <p className="md:text-lg lg:text-xl lg:leading-9">
              Goldis offers a wide range of cakes for different occasions.
              Whether you need a fun unicorn cake’ for your child&apos;s
              birthday, an impressive tiered cake for a grand wedding, or a
              simple heart-shaped cake for a romantic anniversary, Goldis has
              got you covered. Our cakes are not just about taste, but also
              about expressing personal sentiments. Each cake represents love,
              laughter, and cherished memories.
            </p>
          </div>
        </div>
      </div>

      {/* Milestone Cakes */}
      <div className="bg-main pb-16">
        <div className="wrapper">
          <h2 className="mb-8 text-center text-[28px] font-bold">
            Milestone Cakes
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-0">
            <div className="flex w-full flex-col items-center md:px-4 lg:px-7">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Birthday Cakes</h3>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Explore
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:border-x-2 md:border-black md:px-4 lg:px-7">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Number Cakes</h3>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Explore
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4 lg:px-7">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Children Cakes</h3>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Explore
              </button>
            </div>
          </div>

          <p className="mt-16 md:px-4 md:text-xl lg:px-7">
            From the delicate dance of citrus and chocolate in a mousse to the
            explosion of tropical fruit in a sorbet, Goldis is a maestro of
            taste. We source the finest ingredients, experiment with daring
            combinations, and handcraft every treat with meticulous care. Each
            bite is a journey for your palate, a celebration of pure
            deliciousness.
          </p>
        </div>
      </div>

      {/*  */}

      <div className="py-16">
        <div className="wrapper">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">
                Chocolate and Cream Butter
              </h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Lemon Cake Sponge</h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Red Velvet Cake</h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Vanilla Lemon Sponge</h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold text-main">
                Select Option
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="bg-black py-16">
        <div className="wrapper">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">
                Chocolate and Cream Butter
              </h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold uppercase text-black">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Lemon Cake Sponge</h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold text-black">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Red Velvet Cake</h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold text-black">
                Select Option
              </button>
            </div>
            <div className="flex w-full flex-col items-center text-main md:px-4">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src="/assets/img2.png"
                  alt="Vercel Logo"
                  className="mx-auto h-full w-full object-cover dark:invert"
                  width={100}
                  height={24}
                  priority
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Vanilla Lemon Sponge</h3>
              <span>£59.00 - £150</span>
              <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold text-black">
                Select Option
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
