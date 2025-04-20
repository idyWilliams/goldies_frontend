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
    color: "#2a9d90",
  },
  price: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SaleChart() {
  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="mb-6 text-brand-200">Sales Revenue Report</h3>
      <div className="lg:hidden">
        <ChartContainer
          config={chartConfig}
          className="max-h-[350px] min-h-[200px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
              color="#4A90E2"
              stroke="#4A90E2"
              fill="#4A90E2"
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#sales)"
              fillOpacity={0.4}
              stroke="#4A90E2"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="hidden lg:block">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full lg:max-h-[500px]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
              // color="#4A90E2"
              // stroke="#4A90E2"
              // fill="#4A90E2"
            />
            <YAxis
              dataKey="price"
              tickLine={false}
              axisLine={false}
              tickMargin={30}
              tickCount={10}
              tickFormatter={(value) => `₦${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="price"
              type="natural"
              fill="url(#sales)"
              fillOpacity={0.4}
              stroke="#4A90E2"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </section>
  );
}
