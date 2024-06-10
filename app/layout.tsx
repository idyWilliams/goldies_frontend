"use client";
import type { Metadata } from "next";
import { ReactNode, useEffect } from "react";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { ProductProvider } from "@/context/ProductInfoContext";

const metadata: Metadata = {
  title: "Goldies Confectioneries | Buy Delicious Cakes Online",
  description:
    "Indulge in delectable cakes from Goldies Confectioneries. Browse our wide selection of cakes for every occasion and order now for a taste of perfection!",
};

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // TAWK_LOAD_START
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    (function () {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/665b1746981b6c5647772f1f/1hv9t5rn4";
      s1.setAttribute("crossorigin", "*");
      s0?.parentNode?.insertBefore(s1, s0);
    })();
  }, []);

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
