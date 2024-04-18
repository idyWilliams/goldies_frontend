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
    id: 1,
    image: Chocolate,
    productName: "Chocolate Fudge Cake",
    addedDate: "2024/02/12",
    category: "Kids' Cakes",
    subcategories: [
      { label: "Birthday Cakes", value: "birthday_cakes" },
      { label: "Anniversary Cakes", value: "anniversary_cakes" },
      { label: "Graduation Cakes", value: "graduation_cakes" },
      { label: "Baby Shower Cakes", value: "baby_shower_cakes" },
      { label: "Retirement Cakes", value: "retirement_cakes" },
    ],
    priceFrom: 220,
    priceTo: 215,
    quantity: 20,
    status: "available",
  },

  {
    id: 2,
    image: RedVelvet,
    productName: "Red Velvet Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 251,
    priceTo: 292,
    quantity: 20,
    status: "unavailable",
  },

  {
    id: 3,
    image: Vanilla,
    productName: "Vanilla Bean Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 4,
    image: Coconut,
    productName: "Coconut Cream Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 5,
    image: Carrot,
    productName: "Carrot Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 6,
    image: Strawberry,
    productName: "Strawberry Short Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 7,
    image: Lemon,
    productName: "Lemon Drizzle Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 8,
    image: Banana,
    productName: "Banana Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },
];

export const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

export const orderList = [
  {
    id: 1,
    image: Chocolate,
    productName: "Chocolate Fudge Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 420,
    priceTo: 215,
    quantity: 20,
    status: "success",
  },

  {
    id: 2,
    image: RedVelvet,
    productName: "Red Velvet Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 451,
    priceTo: 292,
    quantity: 20,
    status: "pending",
  },

  {
    id: 3,
    image: Vanilla,
    productName: "Vanilla Bean Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 407,
    priceTo: 200,
    quantity: 20,
    status: "failed",
  },

  {
    id: 4,
    image: Coconut,
    productName: "Coconut Cream Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 407,
    priceTo: 200,
    quantity: 20,
    status: "success",
  },

  {
    id: 5,
    image: Carrot,
    productName: "Carrot Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 407,
    priceTo: 200,
    quantity: 20,
    status: "pending",
  },

  {
    id: 6,
    image: Strawberry,
    productName: "Strawberry Short Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 407,
    priceTo: 200,
    quantity: 20,
    status: "failed",
  },

  {
    id: 7,
    image: Lemon,
    productName: "Lemon Drizzle Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 407,
    priceTo: 200,
    quantity: 20,
    status: "success",
  },

  {
    id: 8,
    image: Banana,
    productName: "Banana Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 407,
    priceTo: 200,
    quantity: 20,
    status: "pending",
  },
];
