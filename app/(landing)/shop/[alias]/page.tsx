import SingleProductComp from "@/components/shop-components/SingleProductComp";
import { IProduct } from "@/interfaces/product.interface";
import { getAllProducts, getProductBySlug } from "@/services/hooks/products";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: { alias: string };
}) => {
  const { alias } = params;

  let product: IProduct;
  const res = await getProductBySlug(alias);

  product = res.product;

  if (!product) {
    throw new Error("product not found");
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      type: "website",
      // url: `${config.SITE_URL}/shop/${product.slug}`,
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      title: product.name,
      description: product.description,
      image: product.images[0],
    },
  };
};

export const generateStaticParams = async () => {
  let products = [];
  try {
    const res = await getAllProducts({
      limit: 1000,
    });

    products = res.products;

    return products.map((product: any) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.log(error);
  }
};

const CakeDetailsPage = async ({ params }: { params: { alias: string } }) => {
  const { alias } = params;

  return <SingleProductComp slug={alias} />;
};

export default CakeDetailsPage;
