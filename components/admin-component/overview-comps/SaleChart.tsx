"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
const chartData = [
  { month: "January", price: 186 },
  { month: "February", price: 300 },
  { month: "March", price: 237 },
  { month: "April", price: 73 },
  { month: "May", price: 209 },
  { month: "June", price: 214 },
  { month: "July", price: 100 },
  // { month: "August", price: 0 },
  // { month: "September", price: 0 },
  // { month: "October", price: 0 },
  // { month: "November", price: 0 },
  { month: "December", price: 300 },
];

const chartConfig = {
  month: {
    label: "Month",
    color: "var(--brand-200)",
  },
  price: {
    label: "Sales",
    color: "#e4d064",
  },
} satisfies ChartConfig;

export function SaleChart() {
  return (
    <section className="rounded-xl border-0 bg-brand-100 p-4">
      <h3 className="mb-6 text-brand-200">Sales Revenue Report</h3>
      <div className="lg:hidden">
        <ChartContainer
          config={chartConfig}
          className="sales max-h-[300px] min-h-[200px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} stroke="#e4d06433" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
              color="#e4d064"
              stroke="#e4d064"
              fill="#e4d064"
            />
            {/* <YAxis
              dataKey="price"
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              tickCount={100}
              tickFormatter={(value) => `€${value}`}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e4d064" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e4d064" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="price"
              type="natural"
              fill="url(#sales)"
              fillOpacity={0.4}
              stroke="#e4d064"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="hidden lg:block">
        <ChartContainer
          config={chartConfig}
          className="sales min-h-[200px] w-full lg:max-h-[500px]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} stroke="#e4d06433" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
              color="#e4d064"
              stroke="#e4d064"
              fill="#e4d064"
            />
            <YAxis
              dataKey="price"
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              tickCount={100}
              tickFormatter={(value) => `€${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e4d064" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e4d064" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="price"
              type="natural"
              fill="url(#sales)"
              fillOpacity={0.4}
              stroke="#e4d064"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </section>
  );
}
