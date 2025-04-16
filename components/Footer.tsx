"use client";
import { fetchCategories } from "@/services/hooks/category";
import { subscribeNewsletter } from "@/services/hooks/mail";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Call, Location, Sms } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import goldis from "@/public/assets/new-logo/logo-white.svg";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

// Contact Details Constants
const CONTACT_DETAILS = {
  phone: "+447488855300",
  email: "johndoe@gmail.com",
  address: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
};

const address = encodeURIComponent(CONTACT_DETAILS.address);
const mapLink = `https://www.google.com/maps/search/?api=1&query=${address}`;

const Footer = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { data, isPending, isSuccess } = useQuery({
    queryFn: fetchCategories,
    queryKey: ["all categories"],
  });

  const subscribeToNewsletter = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: () => {
      setNewsletterEmail("");
      setOpenDialog(true);
    },
  });

  useEffect(() => {
    if (!isPending && isSuccess) {
      setCategories(data?.categories);
    } else {
      setCategories([]);
    }
  }, [isPending, isSuccess, data]);

  const getYear = () => {
    return new Date().getFullYear();
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    await subscribeToNewsletter.mutateAsync({ email: newsletterEmail });
  };

  const SOCIAL_LINKS = [
    { icon: BsFacebook, href: "#" },
    { icon: BsInstagram, href: "#" },
    { icon: BsTwitterX, href: "#" },
    { icon: BsLinkedin, href: "#" },
  ];

  return (
    <section className="relative mt-auto grid min-h-[500px] w-full bg-brand-200">
      <div className="wrapper relative py-10 pt-12">
        <div className="mx-auto grid gap-6  rounded-2xl bg-[#231614] p-8 md:grid-cols-2 md:items-center md:py-6 xl:w-10/12">
          <div>
            <h1 className="text-3xl font-semibold text-brand-100 lg:text-[32px]">
              Subscribe to our Newsletter
            </h1>
            <p className="mt-1 text-[16px] text-brand-100">
              Be the first to know about updates on new recipes.
            </p>
          </div>
          <div className="flex h-min w-full items-center rounded-md md:bg-white md:p-2">
            <form
              onSubmit={handleSubscribe}
              className="flex w-full flex-col items-center gap-4 md:flex-row"
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full rounded-md border-0 focus:ring-0"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <Button
                size={"lg"}
                type="submit"
                className=" h-auto w-full bg-brand-200 py-3 text-brand-100 md:mt-0 md:w-auto"
                aria-label="Subscribe to Newsletter"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Success Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className=" border-black bg-black text-center">
              <DialogHeader>
                <DialogTitle className="text-center text-brand-100">
                  <div className="flex justify-between ">
                    <Image
                      src={goldis}
                      className="flex w-[100px] items-center"
                      alt="Goldis Logo sm"
                    />
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <h2 className="mb-4 text-3xl font-bold text-brand-100">
                  Success!
                </h2>
                <p className="text-white">
                  Thank you for subscribing to our newsletter!
                </p>
                <Button
                  onClick={() => setOpenDialog(false)}
                  className="bg-brand-text-brand-100 mx-auto mt-8 w-fit text-[#0F0904] hover:bg-goldie-400"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-20 grid justify-between gap-y-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-x-10">
          <div className="space-y-4">
            <div>
              <Image
                src={goldis}
                alt="logo"
                width={100}
                height={100}
                className="mb-4 w-[150px]"
              />
              <p className="mb-2 text-balance text-white">
                Your perfect stop to shop yummy and fluffy cakes
              </p>
            </div>
            <div>
              <h3 className="text-white">Social Media</h3>
              <hr className="border-brand-text-brand-200 bor1er w-[35px]" />
            </div>
            <div className="flex gap-2 text-white">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, index) => (
                <Link key={index} href={href}>
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Company</h3>
              <hr className="border-brand-text-brand-200 bor1er mb-2 w-[35px]" />
            </div>
            <Link href={"/shop"} className="w-fit hover:underline">
              Products
            </Link>
            <Link href={"/about-us"} className="w-fit hover:underline">
              About Us
            </Link>
            <Link href={"/testimonials"} className="w-fit hover:underline">
              Testimonies
            </Link>
            <Link href={"/contact"} className="w-fit hover:underline">
              Contact Us
            </Link>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="text-white">Products</h3>
              <hr className="border-brand-text-brand-200 bor1er mb-2 w-[35px]" />
            </div>
            <div className="flex flex-col gap-3">
              {isPending ? (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-5 w-4/5 animate-pulse rounded bg-neutral-700 "
                    ></div>
                  ))}
                </div>
              ) : categories.length === 0 ? (
                <p>No categories found.</p>
              ) : (
                categories
                  ?.sort((a: any, b: any) => a?.name?.localeCompare(b.name))
                  ?.map((category: any, index: number) => {
                    if (category?.subCategories?.length < 1) return null;
                    return (
                      <Link
                        key={index}
                        href={`/shop?cat=${encodeURIComponent(category?.name?.toLowerCase())}`}
                        className="w-fit capitalize hover:underline"
                      >
                        {category?.name}
                      </Link>
                    );
                  })
              )}
            </div>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Working Hours</h3>
              <hr className="border-brand-text-brand-200 bor1er mb-2 w-[35px]" />
            </div>
            <span>Monday - Friday: 9am-6pm</span>
            <span>Saturdays 9am-4pm</span>
            <span>Sundays closed</span>
          </div>
          <div className="inline-flex flex-col space-y-3 text-white">
            <div>
              <h3 className="font-bold text-white">Contact Us</h3>
              <hr className="border-brand-text-brand-200 bor1er mb-2 w-[35px]" />
            </div>
            <div className="flex items-center justify-center gap-7 self-end text-white">
              <div className="flex flex-col items-start space-y-3">
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Call />
                  </span>
                  <a
                    href={`tel:${CONTACT_DETAILS.phone}`}
                    className=" hover:underline"
                  >
                    {CONTACT_DETAILS.phone}
                  </a>
                </div>
                <div className="inline-flex items-center gap-5">
                  <span>
                    <Sms />
                  </span>
                  <a
                    href={`mailto:${CONTACT_DETAILS.email}`}
                    className=" hover:underline"
                  >
                    {CONTACT_DETAILS.email}
                  </a>
                </div>
                <div className="inline-flex gap-5">
                  <span>
                    <Location />
                  </span>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:underline"
                  >
                    {CONTACT_DETAILS.address}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-7"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center bg-neutral-700 py-3">
        <div className="wrapper flex w-full flex-col-reverse justify-between gap-5 md:flex-row md:items-center">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            <p className="text-xs text-white md:text-sm">
              {getYear()} &copy; The Cake App. All Rights Reserved
            </p>
            <p className="text-xs text-white/70 md:text-sm">
              • Built with <span className="mx-0.5 text-red-400">❤</span> by{" "}
              <Link
                href="https://www.isentrytechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white hover:underline"
              >
                iSentry Technologies
              </Link>
            </p>
          </div>
          <div className="inline-flex gap-8">
            <Link href={"#"} className="text-xs text-white md:text-sm">
              Terms of Service
            </Link>
            <Link href={"#"} className="text-xs text-white md:text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
