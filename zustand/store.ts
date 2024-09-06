import { categories } from "@/utils/cakeCategories";
import { log } from "console";
import { create } from "zustand";

type State = {
  categories: [];
  setCategories: (allCategories: []) => void;
  getCategoryById: (id: string | null) => any;
};

const useCategoriesStore = create<State>()((set) => ({
  categories: [],
  setCategories: (allCategories) => set({ categories: allCategories }),
  getCategoryById: (id) => {
    console.log(id);
    console.log(categories);

    if (!id) return;
    const selected = categories.find((category: any) => category._id === id);
    console.log(selected);
    return selected;
  },

  // get().categories.find((category: any) => category.id === id),
}));

export default useCategoriesStore;
