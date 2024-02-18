import BreadCrumbs from "@/components/BreadCrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const CartPage = () => {
  return (
    <>
      <Header />
      <section className="bg-gradient-to-br from-black to-neutral-700 py-16 pt-6">
        <div className="wrapper">
          <div className="">
            <BreadCrumbs
              items={[
                {
                  name: "Home",
                  link: "/",
                },
                {
                  name: "Cart",
                  link: "/cart",
                },
              ]}
            />
            <h2 className="mb-8 mt-4 text-2xl font-bold capitalize text-main md:text-3xl">
              Cart(2)
            </h2>

            <div className="hidden border-b border-main pb-2">
              <p className="ml-8 mr-24 text-main">Product</p>
              <div className="right flex flex-1 justify-between lg:ml-auto lg:mr-20 lg:flex-shrink-0 lg:flex-grow-0 lg:basis-1/2">
                <p className="w-[136px] text-main">Quantity</p>
                <p className="w-[100px] text-center text-main">Price</p>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
