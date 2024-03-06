"use client";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ProductProvider } from "@/context/productInfoContext";
import { ShoppingCartProvider } from "@/context/shoppingCartContext";
const metadata: Metadata = {
  title: "Goldies Confectioneries | Buy Delicious Cakes Online",
  description:
    "Indulge in delectable cakes from Goldies Confectioneries. Browse our wide selection of cakes for every occasion and order now for a taste of perfection!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description || ""} />
        {/* @ts-expect-error */}
        <title>{metadata.title}</title>
        <link rel="icon" href="/icon.svg" sizes="any" />
        <meta
          name="keywords"
          content="delicious cakes, buy cakes online, cake delivery, Goldies Confectioneries"
        />
      </head>
      <ShoppingCartProvider>
        <Provider store={store}>
          <ProductProvider>
            <body className="overflow-x-hidden">{children}</body>
          </ProductProvider>
        </Provider>
      </ShoppingCartProvider>
    </html>
  );
}
