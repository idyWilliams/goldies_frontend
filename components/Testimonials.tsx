"use client";
import { useState } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const reviews = [
  {
    client: "Sarah Johnson",
    title: "Deliciously Decadent Treat!",
    comment:
      "Goldis Cake offers a delightful range of flavors and textures. Each bite is like a symphony of sweetness that melts in your mouth. Simply divine!",
  },
  {
    client: "Michael Chang",
    title: "Sensational Sweetness in Every Slice!",
    comment:
      "Goldis Cake truly knows how to satisfy a sweet tooth. From the moist sponge to the rich frosting, every slice is bursting with flavor. It's a dessert lover's dream come true!",
  },
  {
    client: "Emily Rodriguez",
    title: "Heavenly Indulgence on a Plate!",
    comment:
      "Indulging in Goldis Cake is like taking a trip to dessert paradise. The cakes are moist, the toppings are scrumptious, and every bite is a taste sensation. Pure bliss!",
  },
  {
    client: "David Patel",
    title: "Irresistibly Tempting Treats!",
    comment:
      "Goldis Cake crafts cakes that are impossible to resist. From the first glance to the last crumb, their creations are a feast for the eyes and the taste buds. Simply irresistible!",
  },
  {
    client: "Lisa Thompson",
    title: "A Symphony of Sweet Flavors!",
    comment:
      "Goldis Cake masters the art of blending flavors to perfection. With every forkful, you're transported to a world of sweetness and delight. A must-try for any dessert enthusiast!",
  },
  {
    client: "Kevin Nguyen",
    title: "Pure Perfection in Every Bite!",
    comment:
      "Goldis Cake elevates the cake experience to new heights. Each creation is a masterpiece of taste and texture, leaving you craving more. It's perfection on a plate!",
  },
];

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const clientInitails = (name: string) => {
    const value = name.split(" ");
    let initials: string = "";
    value.forEach((el) => {
      initials += el.slice(0, 1);
    });

    return initials;
  };

  return (
    // <section id="testimonials" className="py-16 pt-20">
    //   <div className="wrapper">
    //     <h2 className="mb-8 text-2xl font-bold capitalize md:text-center md:text-3xl">
    //       See how our customers rate us...
    //     </h2>
    //     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    //       {reviews.map((review: any, index: number) => (
    //         <blockquote
    //           key={index}
    //           className="relative overflow-hidden rounded-md border border-neutral-300 bg-white p-7 transition-all duration-300 hover:shadow-lg"
    //         >
    //           <div className="flex items-center gap-3">
    //             <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#b6a650] to-main font-bold">
    //               {clientInitails(review.client)}
    //             </span>
    //             <div>
    //               <h3 className="text-lg font-bold leading-[1.5]">
    //                 {review.client}
    //               </h3>
    //               <div className="flex items-center gap-1">
    //                 <BsStarFill size={18} className="text-yellow-500" />
    //                 <BsStarFill size={18} className="text-yellow-500" />
    //                 <BsStarFill size={18} className="text-yellow-500" />
    //                 <BsStarFill size={18} className="text-yellow-500" />
    //                 <BsStarHalf size={18} className="text-yellow-500" />
    //               </div>
    //             </div>
    //           </div>
    //           <p className="mt-4 leading-[150%]">{review.comment}</p>
    //           <div className="absolute inset-0 bg-gradient-to-tr from-[#b6a650] to-main opacity-0 hover:opacity-100"></div>
    //         </blockquote>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <section id="testimonials" className="py-16 pt-20">
      <div className="wrapper">
        <h2
          data-aos="fade-down"
          className="mb-8 text-2xl font-bold capitalize md:text-center md:text-3xl"
        >
          See how our customers rate us...
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review: any, index: number) => {
            const delay = index * 100;
            console.log(delay, "delay");
            return (
              <blockquote
                data-aos="fade-right"
                data-aos-delay={delay}
                key={index}
                className={`rounded-md border border-neutral-300 bg-white p-7 ${
                  hoveredIndex === index ? "shadow-md" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#b6a650] to-main font-bold">
                    {clientInitails(review.client)}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-[1.5]">
                      {review.client}
                    </h3>
                    <div className="flex items-center gap-1">
                      <BsStarFill size={18} className="text-yellow-500" />
                      <BsStarFill size={18} className="text-yellow-500" />
                      <BsStarFill size={18} className="text-yellow-500" />
                      <BsStarFill size={18} className="text-yellow-500" />
                      <BsStarHalf size={18} className="text-yellow-500" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 leading-[150%]">{review.comment}</p>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
