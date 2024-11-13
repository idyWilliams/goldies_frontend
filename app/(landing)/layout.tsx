"use client";
import { useContext, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import { jwtDecode } from "jwt-decode";
import AuthContext from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const { setIsLogin, setAuth } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    setIsLogin(false);
    setAuth({});
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.setItem("isLogin", JSON.stringify(false));
  };

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
