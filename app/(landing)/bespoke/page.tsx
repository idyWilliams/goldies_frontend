// import BespokeImg from "@/public/assets/large.jpeg";
import TypeForm from "@/components/TypeForm";

const BespokePage = () => {
  return (
    <>
      <section className="bg-brand-200 py-16 pt-28">
        <div className="wrapper">
          <h2 className="mb-2 text-2xl font-bold capitalize text-brand-100 md:text-center md:text-3xl">
            Let&apos;s Create your cake
          </h2>

          <div className="">
            <p className="mb-8 text-brand-100 md:mx-auto md:w-8/12 md:text-center md:text-xl md:leading-[155%]">
              <strong>
                A personalized cake is a unique and special addition to any
                event.
              </strong>
              It adds value and significance to your occasion when displayed as
              a centerpiece. Our aim is to design a stunning cake that not only
              looks great but also tastes delicious.
            </p>
            <TypeForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default BespokePage;
