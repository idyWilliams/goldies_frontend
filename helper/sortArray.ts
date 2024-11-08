import { Category } from "@/services/types";

function sortArray(arr: any) {
  const sortedArray = [...arr].sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  return sortedArray;
}

export default sortArray;
