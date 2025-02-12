import { IAdmin } from "@/interfaces/user.interface";
import { useEffect, useState } from "react";

const useAdmin = () => {
  const [admin, setAdmin] = useState<IAdmin>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem("admin");
      setAdmin(storedAdmin ? JSON.parse(storedAdmin) : null);
    }
  }, []);

  useEffect(() => {
    console.log("admin>>>", admin);
  }, []);

  return admin;
};

export default useAdmin;
