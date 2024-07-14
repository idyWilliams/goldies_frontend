"use client";

import React from "react";
import { Moneys, Profile2User, ShoppingBag } from "iconsax-react";
import EachElement from "@/helper/EachElement";
import OverviewCard from "./overview-comps/OverviewCard";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SaleChart } from "./overview-comps/SaleChart";
import { CategoryChart } from "./overview-comps/CategoryChart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Data = {
  id: number;
  name: string;
  age: number;
};

const Overviews = [
  {
    title: "Total sales",
    icon: Moneys,

    value: 53000,
    increaseRate: 6,
    lastValue: 500000,
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
      <section className="w-full bg-goldie-300 px-4 py-6 pt-[24px] lg:bg-white lg:p-8 lg:pt-6">
        <div className="bg-goldie-300 lg:p-8">
          <div className="flex items-center justify-between">
            <div className="">
              <p className="font-bold">Today&apos;s Sales</p>
              <p className="mb-4 text-[13px]">Sales summary</p>
            </div>
            <Button
              onClick={() => router.push("/admin/create-products")}
              className="m-0 bg-stone-700 text-goldie-300"
            >
              Create Product
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 text-goldie-300 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            <EachElement
              of={Overviews}
              render={(item: any, index: any) => (
                <OverviewCard key={index} data={item} />
              )}
            />
          </div>
        </div>
      </section>
      <SaleReport />
    </>
  );
}

const SaleReport = () => {
  return (
    <>
      <section className="bg-white px-5 py-10">
        <div></div>
        <SaleChart />
      </section>

      {/* <CategoryChart /> */}

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={[
            {
              name: "Page A",
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: "Page B",
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: "Page C",
              uv: 2000,
              pv: 9800,
              amt: 2290,
            },
            {
              name: "Page D",
              uv: 2780,
              pv: 3908,
              amt: 2000,
            },
            {
              name: "Page E",
              uv: 1890,
              pv: 4800,
              amt: 2181,
            },
            {
              name: "Page F",
              uv: 2390,
              pv: 3800,
              amt: 2500,
            },
            {
              name: "Page G",
              uv: 3490,
              pv: 4300,
              amt: 2100,
            },
          ]}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
