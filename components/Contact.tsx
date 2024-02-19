import Image from "next/image";
import ConsultIcon from "../public/assets/consult.webp";

const Contact = () => {
  return (
    <section id="contact" className="bg-main py-16">
      <div className="wrapper grid items-center md:grid-cols-2">
        <div className="order-2 flex flex-wrap gap-x-8 bg-[#B89C3D] p-5 py-8 md:order-1 ">
          <div className="mb-3">
            <h3 className="font-bold">Date</h3>
            <span>Mon - Fri</span>
          </div>
          <div className="mb-3">
            <h3 className="font-bold">Time</h3>
            <span>8:00 - 22:00</span>
          </div>

          <form id="consult" className="mt-8 w-full">
            <label htmlFor="fname" className="mb-3 block">
              <span className="mb-2 block w-full font-bold">Full Name</span>
              <input
                type="text"
                name="fname"
                autoComplete="off"
                id="fname"
                className="form-input w-full rounded-md border-0 bg-[#9C8222] px-4 py-2 focus:border-black focus:ring-black "
              />
            </label>
            <label htmlFor="email" className="mb-3 block">
              <span className="mb-2 block w-full font-bold">Email Address</span>
              <input
                type="email"
                name="email"
                autoComplete="off"
                id="email"
                className="form-input w-full rounded-md border-0 bg-[#9C8222] px-4 py-2 focus:border-black focus:ring-black "
              />
            </label>

            <button
              type="submit"
              className="mt-4 rounded-md bg-black px-5 py-2.5 text-main"
            >
              Book Now
            </button>
          </form>
        </div>
        <div className="order-1 mb-6 md:order-2 md:pl-6">
          <Image
            src={ConsultIcon}
            alt="Animated coffee cup"
            className="mb-5 w-[100px]"
          />
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            Book a Consultation
          </h2>
          <p className="leading-[150%] md:text-xl">
            If you&apos;d like to talk about a project I might be able to help
            with, feel free to book straight in for a free chat using my
            calendar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
