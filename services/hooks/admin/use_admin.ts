// import instance from "@/services/api";

// // GET AN ADMIN
// export const getAdmin = async () => {
//   const response = await instance.get("/admin/invite_admin", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`,
//     },
//   });
//   return response.data;
// };


import { useEffect, useState } from "react";

const useAdmin = () => {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAdmin = localStorage.getItem("admin");
      setAdmin(storedAdmin ? JSON.parse(storedAdmin) : null);
    }
  }, []);

  return admin;
};

export default useAdmin;
