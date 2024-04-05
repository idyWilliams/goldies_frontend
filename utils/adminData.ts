import { Cake, Moneys, Profile2User, ShoppingBag } from "iconsax-react";
import Chocolate from "../public/assets/carrot.webp";
import RedVelvet from "../public/assets/red-velvet-cake.webp";
import Vanilla from "../public/assets/lemon-cake.webp";
import Coconut from "../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import Carrot from "../public/assets/carrot.webp";
import Strawberry from "../public/assets/Fresh-Strawberry-Cake-with-Strawberry-Frosting-3-480x360.webp";
import Lemon from "../public/assets/lemon-cake.webp";
import Banana from "../public/assets/banana-cake-with-cinnamon-cream-102945-1.webp";

export const Overview = [
  {
    id: 1,
    icon: Moneys,
    value: 50,
    title: "Total Sales",
    info: "+6% from yesterday",
  },

  {
    id: 2,
    icon: ShoppingBag,
    value: 500,
    title: "Total Orders",
    info: "+3% from yesterday",
  },

  {
    id: 3,
    icon: Cake,
    value: 9,
    title: "Product Sold",
    info: "+5% from yesterday",
  },

  {
    id: 4,
    icon: Profile2User,
    value: 2,
    title: "New Customers",
    info: "+6% from yesterday",
  },
];

export const topProduct = [
  {
    id: 1,
    productName: "Wedding Cake",
    sale: 90,
    percent: 90,
  },
  {
    id: 2,
    productName: "Red Velvet Sponge Cake",
    sale: 70,
    percent: 70,
  },
  {
    id: 3,
    productName: "Lemon Cake",
    sale: 30,
    percent: 30,
  },
];

const generateID = () => {
  const id = crypto.randomUUID();
  return `GC${id.slice(0, 5).toUpperCase()}`;
};

export const productList = [
  {
    id: generateID(),
    image: Chocolate,
    productName: "Chocolate Fudge Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 220,
    priceTo: 215,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    image: RedVelvet,
    productName: "Red Velvet Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 251,
    priceTo: 292,
    quantity: 20,
    status: "inactive",
  },

  {
    id: generateID(),
    image: Vanilla,
    productName: "Vanilla Bean Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    image: Coconut,
    productName: "Coconut Cream Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    image: Carrot,
    productName: "Carrot Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    image: Strawberry,
    productName: "Strawberry Short Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    image: Lemon,
    productName: "Lemon Drizzle Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    image: Banana,
    productName: "Banana Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },
];

export const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];
