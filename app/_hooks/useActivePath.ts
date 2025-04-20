import AuthContext from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

const useActivePath = () => {
  // @ts-ignore
  const { activePathRef } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const navigateToLogin = () => {
    const redirectUrl = encodeURIComponent(pathname);

    activePathRef.current = pathname;
    router.push(`/sign-in?redirect_url=${redirectUrl}`);
  };

  return navigateToLogin;
};

export default useActivePath;
