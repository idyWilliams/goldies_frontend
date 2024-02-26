import Image from "next/image";
import BirthdayCake from "../public/assets/birthday-cake.webp";
import NumberCake from "../public/assets/number-cake.webp";
import ChildrenCake from "../public/assets/children-cake.webp";
import Link from "next/link";

const MileStoneCakes = () => {
  return (
    <>
      <section className="bg-main py-16">
        <div className="wrapper">
          <h2 className="mb-8 text-center text-[28px] font-bold">
            Milestone Cakes
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-0">
            <div className="flex w-full flex-col items-center md:px-4 lg:px-7">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={BirthdayCake}
                  alt="Birthday Cake"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Birthday Cakes</h3>
              <Link
                href="/shop"
                className="mt-4 inline-block w-[200px] rounded-[50px] bg-black px-8 py-3 text-center font-bold tracking-wider text-main"
              >
                Explore
              </Link>
            </div>
            <div className="flex w-full flex-col items-center md:border-x-2 md:border-black md:px-4 lg:px-7">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={NumberCake}
                  alt="Number Cake"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Number Cakes</h3>
              <Link
                href="/shop"
                className="mt-4 inline-block w-[200px] rounded-[50px] bg-black px-8 py-3 text-center font-bold tracking-wider text-main"
              >
                Explore
              </Link>
            </div>
            <div className="flex w-full flex-col items-center md:px-4 lg:px-7">
              <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                <Image
                  src={ChildrenCake}
                  alt="Children Cake"
                  className="mx-auto h-full w-full object-cover"
                />
              </figure>

              <h3 className="mt-3 text-xl font-bold">Children Cakes</h3>
              <Link
                href="/shop"
                className="mt-4 inline-block w-[200px] rounded-[50px] bg-black px-8 py-3 text-center font-bold tracking-wider text-main"
              >
                Explore
              </Link>
            </div>
          </div>

          <p className="mt-16 leading-[150%] md:px-4 md:text-xl md:leading-[150%] lg:px-7 lg:leading-[155%]">
            From the delicate dance of citrus and chocolate in a mousse to the
            explosion of tropical fruit in a sorbet, Goldis is a maestro of
            taste. We source the finest ingredients, experiment with daring
            combinations, and handcraft every treat with meticulous care. Each
            bite is a journey for your palate, a celebration of pure
            deliciousness.
          </p>
        </div>
      </section>
    </>
  );
};

export default MileStoneCakes;
