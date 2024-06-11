"use client";
import type { Metadata } from "next";
import { ReactNode, useEffect } from "react";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { ProductProvider } from "@/context/ProductInfoContext";
import { cn } from "@/helper/cn";
// import tomatoGrotesk from "@/utils/font";
import localFont from "@next/font/local";

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

const tomatoGrotesk = localFont({
  src: [
    {
      path: "./fonts/tomatogrotesk-bold-webfont.woff2",
      weight: "700",
      style: "normal",
      //   format: "woff2",
    },
    // {
    //   path: "./fonts/tomatogrotesk-bold-webfont.woff",
    //   weight: "700",
    //   style: "normal",
    //   //   format: "woff",
    // },
    // {
    //   path: "./fonts/tomatogrotesk-light-webfont.woff2",
    //   weight: "300",
    //   style: "normal",
    //   //   format: "woff2",
    // },
    // {
    //   path: "./fonts/tomatogrotesk-light-webfont.woff",
    //   weight: "300",
    //   style: "normal",
    //   //   format: "woff",
    // },
    // {
    //   path: "./fonts/tomatogrotesk-regular-webfont.woff2",
    //   weight: "normal",
    //   style: "normal",
    //   //   format: "woff2",
    // },
    // {
    //   path: "./fonts/tomatogrotesk-regular-webfont.woff",
    //   weight: "normal",
    //   style: "normal",
    //   //   format: "woff",
    // },
  ],
});

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
            <body className={cn("overflow-x-hidden", tomatoGrotesk.className)}>
              {children}
            </body>
          </ProductProvider>
        </Provider>
      </ShoppingCartProvider>
    </html>
  );
}
