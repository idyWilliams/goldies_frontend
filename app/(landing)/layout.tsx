"use client";
import { useContext, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import { jwtDecode } from "jwt-decode";
import AuthContext, { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { userLogOut } from "@/services/hooks/user-auth";
import NextTopLoader from "nextjs-toploader";
import Cookies from "js-cookie";
import { USER_DETAILS, USER_TOKEN_NAME } from "@/utils/constants";
import ThemeChanger from "@/components/admin-component/ThemeChanger";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("user") as string);
    setAuth((prev) => ({ ...prev, user: parsedUser?.user }));
    const userToken = parsedUser ? parsedUser?.token : null;

    const handleSession = () => {
      if (
        pathname.includes("/my-account") ||
        pathname.includes("/my-orders") ||
        pathname.includes("/billing")
      ) {
        userLogOut(router);
      } else {
        localStorage.setItem("isLogin", JSON.stringify(false));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        Cookies.remove(USER_TOKEN_NAME);
        Cookies.remove(USER_DETAILS);
      }
    };

    if (!userToken) {
      // console.error("User token is missing.");
      handleSession();
      return;
    }

    try {
      const decodedToken: { iat: number; exp: number } = jwtDecode(userToken);
      const storedTimestamp = decodedToken?.exp * 1000;
      const currentTime = new Date().getTime();
      const sessionExpired = currentTime > storedTimestamp;

      // console.log("sessioninfo:", {
      //   storedTimestamp,
      //   currentTime,
      //   sessionExpired,
      // });

      // When User session is still valid
      if (!sessionExpired) {
        console.log("Valid session user");

        return;
      } else {
        handleSession();
        console.log("InValid session user");
      }
    } catch (error) {
      console.log("Error decoding token:", error, userToken);
      // setIsLogin(false);
    }
  }, [pathname, router, setAuth]);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <NextTopLoader color="#262626" showSpinner={false} height={4} />
      <Header />
      <main className="">
        {children}
        <ThemeChanger />
      </main>
      <Footer />
    </div>
  );
}
