import BreadCrumbs from "@/components/BreadCrumbs";
import ShopComp from "@/components/shop-components/ShopComp";
import { Metadata } from "next";

const pageTitle = "Our Shop";

export const metadata: Metadata = {
  title: pageTitle,
};

const ShopPage = () => {
  return (
    <div className="">
      {/* BREADCRUMBS */}
      <div className="mt-20 bg-brand-200 py-4">
        <div className="wrapper">
          <BreadCrumbs
            items={[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "Shop",
                link: "/shop",
              },
            ]}
          />
        </div>
      </div>

      <section className="relative py-6 pb-10 xl:bg-brand-100">
        <ShopComp />
      </section>
    </div>
  );
};

export default ShopPage;
