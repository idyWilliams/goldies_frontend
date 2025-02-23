"use client";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const storedAdmin = localStorage.getItem("admin");

  //   if (storedAdmin) {
  //     try {
  //       const { token } = JSON.parse(storedAdmin);
  //       const decodedToken: { exp: number } = jwtDecode(token);
  //       const sessionExpired = Date.now() > decodedToken.exp * 1000;

  //       if (!sessionExpired) {
  //         // Redirect authenticated admin to dashboard
  //         router.replace("/admin");
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   }

  //   setIsLoading(false); 
  // }, [router]);

  // if (isLoading) return null;

  return (
    
      <div
        style={{
          background:
            "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.9)), url(/assets/vectorBG.jpg)",
        }}
        className="flex min-h-dvh flex-col items-center justify-center px-4 py-4"
      >
        <div className="">
          <div className="mb-5 flex justify-center">
            <Link href="#" className="relative">
              <Image
                src="/assets/goldis-gold-logo.png"
                className="w-[200px] lg:w-[230px]"
                width={175}
                height={92}
                alt="Goldis Logo"
                priority
              />
            </Link>
          </div>

          <>{children}</>
        </div>
      </div>
  );
};

export default Layout;
