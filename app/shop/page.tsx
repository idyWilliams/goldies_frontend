"use client";
import Image, { StaticImageData } from "next/image";
import Chocolate from "../../public/assets/birthday-cake.webp";
import LemonCake from "../../public/assets/lemon-cake.webp";
import RedVelvet from "../../public/assets/red-velvet-cake.webp";
import BreadCrumbs from "@/components/BreadCrumbs";
import Link from "next/link";
import coconut from "../../public/assets/AT0213_coconut-cream-cake_s4x3.jpg";
import velvet from "../../public/assets/vanilla-bean-cakev2-819x1024.jpg";
import carrot from "../../public/assets/carrot.jpeg";
import banana from "../../public/assets/banana-cake-with-cinnamon-cream-102945-1.jpeg";
import Layout from "../../components/Layout";
import { BsDash, BsPlus } from "react-icons/bs";
import berry from "/public/assets/Fresh-Strawberry-Cake-with-Strawberry-Frosting-3-480x360.webp";

type CakeProduct = {
  id: number;
  cakeName: string;
  slug: string;
  image: StaticImageData;
  priceFrom: number;
  priceTo: number;
};

export const cakeProducts1 = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    description:
      "Rich and moist chocolate cake layered with creamy fudge frosting.",
    minPrice: 20.99,
    maxPrice: 25.99,
    imageUrl: Chocolate,
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    weight: "1.5kg",
    available: true,
    bestSeller: true,
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    description:
      "Classic red velvet cake with layers of smooth cream cheese frosting.",
    minPrice: 25.99,
    maxPrice: 29.99,
    imageUrl: RedVelvet,
    ingredients: ["Cocoa Powder", "Buttermilk", "Vinegar", "Flour", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    weight: "1.8kg",
    available: true,
    bestSeller: false,
  },
  {
    id: 3,
    name: "Vanilla Bean Cake",
    description:
      "Delicate vanilla sponge cake infused with real vanilla beans.",
    minPrice: 18.99,
    maxPrice: 22.99,
    imageUrl: LemonCake,
    ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Vanilla Beans"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    weight: "1.2kg",
    available: false,
    bestSeller: false,
  },
  {
    id: 4,
    name: "Strawberry Shortcake",
    description:
      "Light and fluffy sponge cake layered with fresh strawberries and whipped cream.",
    minPrice: 22.99,
    maxPrice: 27.99,
    imageUrl: berry,
    ingredients: [
      "Flour",
      "Sugar",
      "Butter",
      "Eggs",
      "Strawberries",
      "Whipped Cream",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    weight: "1.5kg",
    available: true,
    bestSeller: true,
  },
  {
    id: 5,
    name: "Lemon Drizzle Cake",
    description:
      "Zesty lemon cake drizzled with tangy lemon syrup and topped with lemon zest.",
    minPrice: 19.99,
    maxPrice: 23.99,
    imageUrl: LemonCake,
    ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Lemons"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    weight: "1.2kg",
    available: true,
    bestSeller: false,
  },
  {
    id: 6,
    name: "Carrot Cake",
    description:
      "Moist carrot cake with a hint of cinnamon, topped with cream cheese frosting and walnuts.",
    minPrice: 24.99,
    maxPrice: 29.99,
    imageUrl: carrot,
    ingredients: [
      "Flour",
      "Sugar",
      "Butter",
      "Eggs",
      "Carrots",
      "Cinnamon",
      "Walnuts",
    ],
    allergens: ["Gluten", "Dairy", "Eggs", "Nuts"],
    weight: "1.8kg",
    available: true,
    bestSeller: false,
  },
  {
    id: 7,
    name: "Coconut Cream Cake",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut.",
    minPrice: 23.99,
    maxPrice: 27.99,
    imageUrl: coconut,
    ingredients: [
      "Flour",
      "Sugar",
      "Butter",
      "Eggs",
      "Coconut Milk",
      "Shredded Coconut",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    weight: "1.5kg",
    available: false,
    bestSeller: false,
  },
  {
    id: 8,
    name: "Banana cake",
    description:
      "Moist and flavorful banana cake with a hint of cinnamon and walnuts.",
    minPrice: 16.99,
    maxPrice: 20.99,
    imageUrl: banana,
    ingredients: [
      "Flour",
      "Sugar",
      "Butter",
      "Eggs",
      "Bananas",
      "Cinnamon",
      "Walnuts",
    ],
    allergens: ["Gluten", "Dairy", "Eggs", "Nuts"],
    weight: "1kg",
    available: true,
    bestSeller: true,
  },
];

const cakeProducts2 = [
  {
    id: 1,
    cakeName: "Chocolate and Cream Butter",
    slug: "chocolate-cream-butter",
    image: Chocolate,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 2,
    cakeName: "Lemon Cake",
    slug: "lemon-cake",
    image: LemonCake,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 3,
    cakeName: "Red Velvet Cake Sponge",
    slug: "red-velvet-cake-sponge",
    image: RedVelvet,
    priceFrom: 59,
    priceTo: 150,
  },
  {
    id: 4,
    cakeName: "Vanilla Lemon Sponge",
    slug: "vanilla-lemon-sponge",
    image: LemonCake,
    priceFrom: 59,
    priceTo: 150,
  },
];

const ShopPage = ({ params }: any) => {
  const slugify = (text: { toString: () => string }) =>
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  const addSlugToCakes = (cakes: any[]) => {
    return cakes.map((cake: any) => ({
      ...cake,
      slug: slugify(cake.name),
    }));
  };

  const cakes = addSlugToCakes(cakeProducts1);
  return (
    <>
      <Layout>
        {/* BREADCRUMBS */}
        <div className="bg-black pb-6 pt-20">
          <div className="wrapper">
            <BreadCrumbs
              items={[
                {
                  name: "Home",
                  link: "/",
                },
                {
                  name: "Shop",
                  link: "/shop",
                },
              ]}
            />
          </div>
        </div>

        {/* CAKE PRODUCT LIST 1 */}
        <section className="py-16 pt-3">
          <div className="wrapper">
            <h3 className="mb-6 mt-4 text-2xl font-bold text-black">
              All Cakes
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
              {cakes.map((cake: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.imageUrl}
                      alt={cake.name}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize">
                    {cake.name}
                  </h3>
                  <span className="text-lg">
                    &euro;{cake.minPrice} - &euro;{cake.maxPrice}
                  </span>
                  <Link
                    href={`/shop/${cake.slug}`}
                    className="mt-4 w-[200px] rounded-[50px] bg-black px-8 py-3 font-bold uppercase text-main"
                  >
                    Select Option
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAKE PRODUCT LIST 2 */}
        {/* <div className="bg-black py-16">
          <div className="wrapper">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-0 md:gap-y-8 lg:grid-cols-3">
              {cakeProducts2.map((cake: any, index: number) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center md:px-4"
                >
                  <figure className="h-[200px] w-full overflow-hidden md:h-[250px]">
                    <Image
                      src={cake.image}
                      alt={cake.cakeName}
                      className="mx-auto h-full w-full object-cover"
                    />
                  </figure>

                  <h3 className="mt-3 text-xl font-bold capitalize text-main">
                    {cake.cakeName}
                  </h3>
                  <span className="text-lg text-main">
                    &euro;{cake.priceFrom} - &euro;{cake.priceTo}
                  </span>
                  <button className="mt-4 w-[200px] rounded-[50px] bg-main px-8 py-3 font-bold uppercase text-black underline">
                    Select Option
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  );
};

export default ShopPage;
