import { Cake, Moneys, Profile2User, ShoppingBag } from "iconsax-react";

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
    productName: "Chocolate Fudge Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
    productName: "Red Velvet Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },

  {
    id: generateID(),
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
    productName: "Coconut Cream Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "active",
  },
];
