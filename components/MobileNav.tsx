import Link from "next/link";

const MobileNav = ({ pathname, show, setShow }: any) => {
  return (
    <div
      className={`fixed top-0 z-10 flex h-screen w-full justify-start bg-black bg-opacity-30 backdrop-blur-md duration-300 lg:hidden ${show ? "left-0" : "-left-full"}`}
    >
      <div className="flex h-full w-8/12 flex-col gap-8 bg-[#f4ecc1] p-9 pt-20 sm:w-6/12">
        <Link
          href="/"
          className={`${pathname === "/" ? "font-bold" : ""}`}
          onClick={() => setShow(false)}
        >
          Home
        </Link>
        <Link href="/#about" onClick={() => setShow(false)}>
          About
        </Link>
        <Link
          href="/shop"
          className={`${pathname === "/shop" ? "font-bold" : ""}`}
          onClick={() => setShow(false)}
        >
          Shop Cake
        </Link>
        <Link
          href="/bespoke"
          className={`${pathname === "/bespoke" ? "font-bold" : ""}`}
          onClick={() => setShow(false)}
        >
          Bespoke Cake Order
        </Link>
        <Link href="/#testimonials" onClick={() => setShow(false)}>
          Testimonials
        </Link>
        <Link href="/#contact" onClick={() => setShow(false)}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
