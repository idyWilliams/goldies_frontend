import AuthContext from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

const useActivePath = () => {
  // @ts-ignore
  const { activePathRef } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const navigateToLogin = () => {
    console.log(pathname);

    activePathRef.current = pathname;
    router.push("/sign-in");
  };

  return navigateToLogin;
};

export default useActivePath;
