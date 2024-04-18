import { createContext } from "react";

export interface createProductContextValue {
  checkoutStep: string[];
  currentStep: number;
  //   displayStep: (sellersStep: any) => JSX.Element | undefined;
  handleClick: (direction: string) => void;
}
export const createProductContext = createContext<createProductContextValue>(
  {} as createProductContextValue,
);
