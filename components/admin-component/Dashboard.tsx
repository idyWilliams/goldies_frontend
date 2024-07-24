"use client";

import React from "react";
import { Moneys, Profile2User, ShoppingBag } from "iconsax-react";
import EachElement from "@/helper/EachElement";
import OverviewCard from "./overview-comps/OverviewCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SaleChart } from "./overview-comps/SaleChart";
import { CategoryChart } from "./overview-comps/CategoryChart";
import { OrderAnalytics } from "./overview-comps/OrderAnalytics";
import { CustomersAnalytics } from "./overview-comps/CustomerAnalytics";
import { TopProducts } from "./overview-comps/TopProducts";

const Overviews = [
  {
    title: "Total sales",
    icon: Moneys,

    value: 53000,
    increaseRate: 6,
    lastValue: 50000,
    isPrice: true,
  },
  {
    title: "Total Orders",
    value: 22,
    icon: ShoppingBag,
    increaseRate: 3,
    lastValue: 16,
    isPrice: false,
  },
  {
    title: "New Customers",
    icon: Profile2User,
    value: 5,
    increaseRate: 5,
    lastValue: 2,
    isPrice: false,
  },
];

export default function Dashboard() {
  const router = useRouter();
  return (
    <>
      <section className="mb-5 w-full bg-goldie-300 px-4 py-6 pt-[24px] lg:bg-white lg:p-4 lg:pt-6">
        <div className="bg-goldie-300 lg:p-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="">
              <p className="font-bold">Today&apos;s Sales</p>
              <p className="text-[13px]">Sales summary</p>
            </div>
            <Button
              onClick={() => router.push("/admin/create-products")}
              className="m-0 bg-stone-700 text-goldie-300"
            >
              Create Product
            </Button>
          </div>

          <div className="hide-scrollbar w-full overflow-x-auto">
            <div className="w-full gap-6 space-y-4 text-goldie-300 md:flex md:w-min md:space-y-0 lg:grid-cols-3 xl:grid xl:w-full xl:gap-6">
              <EachElement
                of={Overviews}
                render={(item: any, index: any) => (
                  <OverviewCard key={index} data={item} />
                )}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6 px-4 xl:hidden">
        <SaleChart />
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          {" "}
          <CategoryChart /> <TopProducts />
        </div>
        <OrderAnalytics />
        <CustomersAnalytics />
      </div>

      <div className="hidden space-y-6 px-4 xl:block">
        <SaleChart />
        <div className="grid gap-5 md:grid-cols-[0.5fr_2fr] md:items-stretch">
          <CategoryChart /> <OrderAnalytics />
        </div>
        <div className="grid gap-5 md:grid-cols-[2fr_0.5fr] md:items-stretch">
          <CustomersAnalytics />
          <TopProducts />
        </div>
      </div>
    </>
  );
}
