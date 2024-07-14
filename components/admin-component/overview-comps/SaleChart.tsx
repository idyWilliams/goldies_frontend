"use client";

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
  { month: "February", price: 305 },
  { month: "March", price: 237 },
  { month: "April", price: 73 },
  { month: "May", price: 209 },
  { month: "June", price: 214 },
];

const chartConfig = {
  price: {
    label: "Desktop",
    color: "#e4d064",
  },
  month: {
    label: "Desktop",
    color: "#e4d064",
  },
} satisfies ChartConfig;

export function SaleChart() {
  return (
    <Card className="border-none bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-main">Sales Report</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} color="#e4d064" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: any) => value.slice(0, 3)}
            />
            {/* <YAxis
              dataKey="price"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // tickFormatter={(value: any) => `£${value.slice(0, 3)}`}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>{" "}
    </Card>
  );
}
