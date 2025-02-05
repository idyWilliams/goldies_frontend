"use client";
import type { Metadata } from "next";
import { ReactNode, useEffect } from "react";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { ProductProvider } from "@/context/ProductInfoContext";
import { cn } from "@/helper/cn";
import tomatoGrotesk from "@/utils/font";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BASEURL } from "@/services/api";
import { AuthProvider } from "@/context/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

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

console.log("Current NODE_ENV:", process.env.NODE_ENV, BASEURL);

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  // TAWK_LOAD_START
  // useEffect(() => {
  //   window.Tawk_API = window.Tawk_API || {};
  //   window.Tawk_LoadStart = new Date();

  //   (function () {
  //     if (!pathname.includes("/admin")) {
  //       const s1 = document.createElement("script");
  //       const s0 = document.getElementsByTagName("script")[0];
  //       s1.async = true;
  //       s1.src = "https://embed.tawk.to/665b1746981b6c5647772f1f/1hv9t5rn4";
  //       s1.setAttribute("crossorigin", "*");
  //       s0?.parentNode?.insertBefore(s1, s0);
  //     }
  //   })();
  // }, []);

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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ShoppingCartProvider>
            <Provider store={store}>
              <ProductProvider>
                <body
                  className={cn("overflow-x-hidden", tomatoGrotesk.className)}
                >
                  {children}
                  <Toaster position="top-right" richColors expand={true} />
                </body>
              </ProductProvider>
            </Provider>
          </ShoppingCartProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </html>
  );
}
