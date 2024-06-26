import { Cake, Moneys, Profile2User, ShoppingBag } from "iconsax-react";
import Chocolate from "../public/assets/carrot.webp";
import RedVelvet from "../public/assets/red-velvet-cake.webp";
import Vanilla from "../public/assets/lemon-cake.webp";
import Coconut from "../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import Carrot from "../public/assets/carrot.webp";
import Strawberry from "../public/assets/Fresh-Strawberry-Cake-with-Strawberry-Frosting-3-480x360.webp";
import Lemon from "../public/assets/lemon-cake.webp";
import Banana from "../public/assets/banana-cake-with-cinnamon-cream-102945-1.webp";
import { cakeShapes, cakeSizes, fillingsList, toppings } from "./cakeData";

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
    image: [Chocolate, RedVelvet, Coconut, Carrot],
    productName: "Chocolate Fudge Cake",
    addedDate: "2024/04/22",
    category: "Kids' Cakes",
    subcategory: "Princess Cakes",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    shapes: cakeShapes,
    sizes: cakeSizes,
    fillings: fillingsList,
    toppings: toppings,
    priceFrom: 200,
    priceTo: 215,
    quantity: 20,
    status: "available",
  },

  {
    id: 2,
    image: [RedVelvet],
    productName: "Red Velvet Cake",
    addedDate: "2023/04/02",
    category: "Milestone cake",
    subcategory: "Birthday Cakes",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    priceFrom: 251,
    priceTo: 292,
    quantity: 20,
    status: "unavailable",
  },

  {
    id: 3,
    image: [Vanilla],
    productName: "Vanilla Bean Cake",
    addedDate: "2024/02/12",
    category: "Milestone cake",
    subcategory: "Birthday Cakes",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 4,
    image: [Coconut],
    productName: "Coconut Cream Cake",
    addedDate: "2023/07/25",
    category: "Cupcake",
    subcategory: "Vegan cakes",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 5,
    image: [Carrot],
    productName: "Carrot Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 6,
    image: [Strawberry],
    productName: "Strawberry Short Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 7,
    image: [Lemon],
    productName: "Lemon Drizzle Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
    priceFrom: 107,
    priceTo: 200,
    quantity: 20,
    status: "available",
  },

  {
    id: 8,
    image: [Banana],
    productName: "Banana Cake",
    addedDate: "2024/02/12",
    category: "fruit cake",
    description:
      "Decadent coconut cake with layers of creamy coconut filling and topped with shredded coconut",
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
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    mobile: +447488855300,
    productName: "Chocolate Fudge Cake",
    orderDate: "2024/02/12",
    billingName: "John Doe",
    totalPrice: 420,
    priceTo: 215,
    quantity: 20,
    status: "success",
    shipping: 10,
    tax: 5,
    products: [
      {
        image: RedVelvet,
        productName: "Red Velvet Cake",
        priceTo: 150,
        quantity: 2,
      },
      {
        image: Chocolate,
        productName: "Chocolate Fudge Cake",
        priceTo: 215,
        quantity: 1,
      },
      {
        image: Coconut,
        productName: "Coconut Cream Cake",
        priceTo: 205,
        quantity: 1,
      },
      {
        image: Strawberry,
        productName: "Strawberry Short Cake",
        priceTo: 200,
        quantity: 2,
      },
    ],
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
    products: [],
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
    products: [],
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
    products: [],
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
    products: [],
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
    products: [],
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
    products: [],
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
    products: [],
    status: "pending",
  },
];
export const customers = [
  {
    id: 1,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 2,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 3,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 4,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 5,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 6,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 7,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
  {
    id: 8,
    productName: "Banana Cake",
    email: "johndoe@gmail.com",
    billingAddress: "37 Wallenger Avenue, Romford, Essex, England, RM2 6EP",
    contactNumber: +447488855300,
    dateOnboarded: "2024/02/12",
    customerName: "John Doe",
    amountSpent: 895.5,
    orders: 20,
  },
];

export const customerOrders = [
  {
    productName: "Red Velvet Cake",
    OrderId: "#SK2540",
    orderDate: "2024/02/06",
    quantity: 2,
    status: "completed",
    amount: 250,
    shipping: 5.5,
    total: 225.5,
    image: RedVelvet,
  },
  {
    productName: "Chocolate Cake",
    OrderId: "#SK2541",
    orderDate: "2024/02/07",
    quantity: 1,
    status: "failed",
    amount: 150,
    shipping: 5.5,
    total: 225.5,
    image: Chocolate,
  },
  {
    productName: "Vanilla Cake",
    OrderId: "#SK2542",
    orderDate: "2024/02/08",
    quantity: 3,
    status: "pending",
    amount: 300,
    shipping: 5.5,
    total: 225.5,
    image: Vanilla,
  },
  {
    productName: "Banana Cake",
    OrderId: "#SK2543",
    orderDate: "2024/02/09",
    quantity: 2,
    status: "completed",
    amount: 270,
    shipping: 5.5,
    total: 225.5,
    image: Banana,
  },
  {
    productName: "Lemon Cake",
    OrderId: "#SK2544",
    orderDate: "2024/02/10",
    quantity: 1,
    status: "pending",
    amount: 100,
    shipping: 5.5,
    total: 225.5,
    image: Lemon,
  },
  {
    productName: "Strawberry Cake",
    OrderId: "#SK2545",
    orderDate: "2024/02/11",
    quantity: 4,
    status: "completed",
    amount: 400,
    shipping: 5.5,
    total: 225.5,
    image: Strawberry,
  },
  {
    productName: "Carrot Cake",
    OrderId: "#SK2546",
    orderDate: "2024/02/12",
    quantity: 2,
    status: "pending",
    amount: 220,
    shipping: 5.5,
    total: 225.5,
    image: Carrot,
  },
  {
    productName: "Cheesecake",
    OrderId: "#SK2547",
    orderDate: "2024/02/13",
    quantity: 1,
    status: "failed",
    amount: 180,
    shipping: 5.5,
    total: 225.5,
    image: Coconut,
  },
  {
    productName: "Red Velvet Cake",
    OrderId: "#SK2548",
    orderDate: "2024/02/14",
    quantity: 3,
    status: "completed",
    amount: 375,
    shipping: 5.5,
    total: 225.5,
    image: RedVelvet,
  },
  {
    productName: "Chocolate Cake",
    OrderId: "#SK2549",
    orderDate: "2024/02/15",
    quantity: 2,
    status: "completed",
    amount: 300,
    shipping: 5.5,
    total: 225.5,
    image: Chocolate,
  },
];

export type Order = {
  name: string;
  id: string;
  date: string;
  price: string;
  status: "Pending" | "Cancelled" | "Delivered";
  total: number;
  shippingFee: number;
  quantity: number;
};

export const recentOrders: Order[] = [
  {
    name: "Strawberry Sponge Cake",
    id: "B736383836hgdy73",
    date: "2024-05-06",
    price: "300.00",
    status: "Pending", // Options: Pending, Cancelled",Delivered
    total: 100,
    shippingFee: 5.5,
    quantity: 2,
  },
  {
    name: "Chocolate Fudge Cake",
    id: "C839383938dj38",
    date: "2024-05-07",
    price: "250.00",
    status: "Delivered",
    total: 100,
    quantity: 1,
    shippingFee: 5.5,
  },
  {
    name: "Vanilla Cream Cake",
    id: "V939383838dk39",
    date: "2024-05-08",
    price: "200.00",
    status: "Cancelled",
    total: 100,
    shippingFee: 5.5,
    quantity: 2,
  },
  {
    name: "Red Velvet Cake",
    id: "R828383828fj29",
    date: "2024-05-09",
    price: "320.00",
    status: "Pending",
    total: 100,
    shippingFee: 5.5,
    quantity: 3,
  },
  {
    name: "Lemon Drizzle Cake",
    id: "L737383727gj40",
    date: "2024-05-10",
    price: "180.00",
    status: "Delivered",
    total: 100,
    shippingFee: 5.5,
    quantity: 1,
  },
  {
    name: "Carrot Cake",
    id: "K929383728fh50",
    date: "2024-05-11",
    price: "270.00",
    status: "Pending",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Cheesecake",
    id: "C826363638gh60",
    date: "2024-05-12",
    price: "230.00",
    status: "Delivered",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Black Forest Cake",
    id: "B737363737hi70",
    date: "2024-05-13",
    price: "340.00",
    status: "Cancelled",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Pineapple Upside Down Cake",
    id: "P826373738ij80",
    date: "2024-05-14",
    price: "290.00",
    status: "Pending",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
  {
    name: "Tiramisu",
    id: "T738383939kj90",
    date: "2024-05-15",
    price: "310.00",
    status: "Delivered",
    total: 100,
    quantity: 2,
    shippingFee: 5.5,
  },
];
