import { create } from "zustand";
import { Admin, CreateAdmin } from "@/services/types";
import { createAdmin } from "@/services/hooks/admin-auth";
import { devtools, persist } from "zustand/middleware";


interface AdminStore {
  admin: Admin | null;
  updateAdmin: (admin: Admin) => void;
}

export const useAdminStore = create<AdminStore>()(
  devtools(
    persist<AdminStore>(
      (set) => ({
        admin: null,
        updateAdmin: (admin: Admin) => set({ admin }),
      }),
      {
        name: "admin-storage", 
      },
    ),
    { name: "AdminStore" }, 
  ),
);

