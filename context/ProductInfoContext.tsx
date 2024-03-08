import React, { createContext, useContext, useState } from "react";

interface IChildren {
  children: React.ReactNode;
}

export interface IProductInfo {
  id: any;
  cakeName: string;
  slug: string;
  image: string;
  priceFrom: number;
  priceTo: number;
  [key: string]: any;
}

interface IProductContextProps {
  state: IProductInfo;
  setState: React.Dispatch<React.SetStateAction<IProductInfo>>;
}

export const ProductStateContext = createContext({} as IProductContextProps);

export const ProductProvider = ({ children }: IChildren) => {
  const initialState: IProductInfo = {
  id: "",
  cakeName: "",
  slug: "",
  image: "",
  priceFrom: 0,
  priceTo: 0
  };
  const [productData, setProductData] = useState<IProductInfo>(initialState);

  return (
    <ProductStateContext.Provider
      value={{ state: productData, setState: setProductData }}
    >
      {children}
    </ProductStateContext.Provider>
  );
};

export function useProductState() {
  const context = useContext(ProductStateContext);
  if (!context) {
    throw new Error("useProductState must be used within the AppProvider");
  }
  return context;
}
