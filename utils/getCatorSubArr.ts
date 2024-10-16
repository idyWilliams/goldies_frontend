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
  setCatArr: any,
) => {
  const reversedCats = [...arr].reverse();
  setCatArr(reversedCats);
  const paginatedArr = pagFxn(reversedCats, limit);
  return paginatedArr;
};
