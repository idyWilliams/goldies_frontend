import { chunkArray } from "@/helper/chunkArray";
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

  setCatArr: any,
) => {
  const paginatedArr = chunkArray(arr, limit);
  return paginatedArr;
};
