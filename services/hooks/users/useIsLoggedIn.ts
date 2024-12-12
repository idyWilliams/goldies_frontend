import React, { useEffect, useState } from "react";

const useIsLoggedIn = () => {
  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = JSON.parse(localStorage.getItem("user") as string);
      setIsLogin(Boolean(isLoggedIn));
    }
  }, [isLogin]);
  return isLogin;
};

export default useIsLoggedIn;
