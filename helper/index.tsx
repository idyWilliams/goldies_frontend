import { ICake } from "@/types/products";

export const slugify = (text: { toString: () => string }) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export const addSlugToCakes = (cakes: any) => {
  return cakes.map((cake: ICake) => ({
    ...cake,
    slug: slugify(cake.name),
  }));
};
