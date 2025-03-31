import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import { cn } from "@/helper/cn";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loading from "./(landing)/loading";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./providers/QueryProvider";
import { NotificationProvider } from "@/context/NotificationProvider";

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  fallback: ["system-ui", "arial"],
  preload: true,
});

const SITE_TITLE = "Goldies Confectioneries | Buy Delicious Cakes Online";
const SITE_DESCRIPTION =
  "Indulge in delectable cakes from Goldies Confectioneries. Browse our wide selection of cakes for every occasion and order now for a taste of perfection!";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
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
        {/* <meta name="description" content={metadata.description || ""} /> */}
        {/* <title>{metadata.title}</title> */}
        <link rel="icon" href="/icon.svg" sizes="any" />
        {/* <meta
          name="keywords"
          content="delicious cakes, buy cakes online, cake delivery, Goldies Confectioneries"
        /> */}
      </head>
      <body className={cn("overflow-x-hidden", outfit.className)}>
        <QueryProvider>
          <AuthProvider>
            <NotificationProvider>
              <StoreProvider>
                <Suspense fallback={<Loading />}>
                  <main>{children}</main>
                  <Toaster
                    position="top-right"
                    richColors
                    expand={true}
                    closeButton
                  />
                </Suspense>
              </StoreProvider>
            </NotificationProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
