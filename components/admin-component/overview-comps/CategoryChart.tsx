"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EachElement from "@/helper/EachElement";
import { cn } from "@/helper/cn";
const chartData = [
  { category: "milestones", sales: 200, fill: "#13B136" },
  { category: "themed", sales: 100, fill: "#FFCC00" },
  { category: "kids", sales: 187, fill: "#E4D064" },
  { category: "cupcakes", sales: 173, fill: "#E03131" },
];

const chartConfig = {
  Categories: {
    label: "Cake Categories",
  },
  milestones: {
    label: "Milestone Cakes",
    color: "#13B136",
  },
  themed: {
    label: "Themed Cakes",
    color: "#FFCC00",
  },
  kids: {
    label: "Kids Cakes",
    color: "#E4D064",
  },
  cupcakes: {
    label: "Cupcakes",
    color: "#E03131",
  },
} satisfies ChartConfig;

export function CategoryChart() {
  return (
    <div className="flex flex-col rounded-2xl border-0 bg-neutral-900 p-4">
      <h2 className="font-bold text-goldie-300">Cakes Category Chart</h2>
      <div className="items-center justify-center xl:flex xl:flex-col">
        <div className="pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] xl:min-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="sales"
                nameKey="category"
                innerRadius={55}
              />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="mx-auto flex flex-col items-start gap-3 lg:w-[200px] xl:w-auto">
          <EachElement
            of={chartData}
            render={(item: any, index: number) => (
              <div className="flex items-center gap-2" key={index}>
                <span
                  style={{ backgroundColor: `${item?.fill}` }}
                  className={cn(
                    "inline-block h-3 w-3 rounded-full",
                    `bg-[${item?.fill}]`,
                  )}
                ></span>

                <span className="capitalize text-goldie-300">
                  {item?.category} cakes
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

// const chartData = [
//   { category: "milestone cakes", sales: 275, fill: "#13B136" },
//   { category: "themed cakes", sales: 200, fill: "#FFCC00" },
//   { category: "kids cakes", sales: 187, fill: "#E4D064" },
//   { category: "cupcakes", sales: 173, fill: "#E03131" },
// ];
