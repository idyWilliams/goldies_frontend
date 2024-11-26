import { StateCreator } from "zustand";
import { GetProductSlice } from "./getPdctSlice";

// const [category, setCategory] = useState<string>("");

// const [shapes, setShapes] = useState<[]>([]);
// const [flavour, setFlavours] = useState<[]>([]);
// const [sizes, setSizes] = useState<[]>([]);
// const [addOn, setAddOn] = useState<[]>([]);

// const [images, setImages] = useState<any>({
//   image1: "",
//   image2: "",
//   image3: "",
//   image4: "",
// });

export interface CreateProductSlice {
  category: string;
  categoryData: { name: string; id: string };
  subCategory: any[];
  productType: string;
  shapes: [];
  flavour: [];
  sizes: [];
  addOn: [];
  images: any;
  setCategory: (value: string) => void;
  setCategoryData: (value: { name: string; id: string }) => void;
  setSubCategory: (value: any[]) => void;
  setProductType: (value: string) => void;
}

export const createPdctStoreSlice: StateCreator<
  CreateProductSlice & GetProductSlice,
  [],
  [],
  CreateProductSlice
> = (set) => ({
  category: "",
  categoryData: { name: "", id: "" },
  subCategory: [],
  productType: "",
  shapes: [],
  flavour: [],
  sizes: [],
  addOn: [],
  images: { image1: "", image2: "", image3: "", image4: "" },
  setCategory: (value) => set({ category: value }),
  setCategoryData: (value) => set({ categoryData: value }),
  setSubCategory: (value) => set({ subCategory: value }),
  setProductType: (value) => set({ productType: value }),
});
