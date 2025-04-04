import { createContext } from "react";

export interface createProductContextValue {
  checkoutStep: string[];
  currentStep: number;
  //   displayStep: (sellersStep: any) => JSX.Element | undefined;
  handleClick: (direction: string) => void;
}
export const CreateProductContext = createContext<createProductContextValue>(
  {} as createProductContextValue,
);
