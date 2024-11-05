import { Category, SubCategory } from "@/services/types";
import React from "react";

// type GetCatOrSubArrPropType = {
//   arr: SubCategory[] | Category[];
//   limit: number;
//   pagFxn: any;
//   setCatArr: any;
// };

export const getCatorSubArr = (
  arr: any[],
  limit: number,
  pagFxn: any,
  setCatOrSubArr: any,
) => {
  const reversedCats = [...arr].reverse();
  setCatOrSubArr(reversedCats);
  const paginatedArr = pagFxn(reversedCats, limit);
  return paginatedArr;
};
