"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery } from "react-responsive";

const chartData = [
  { month: "January", orders: 186 },
  { month: "February", orders: 305 },
  { month: "March", orders: 237 },
  { month: "April", orders: 73 },
  { month: "May", orders: 209 },
  { month: "June", orders: 214 },
  { month: "July", orders: 186 },
  { month: "August", orders: 305 },
  { month: "September", orders: 237 },
  { month: "October", orders: 73 },
  { month: "November", orders: 209 },
  { month: "December", orders: 214 },
];

const chartConfig = {
  orders: {
    label: "Orders",
    color: "#121212",
  },
} satisfies ChartConfig;

export function OrderAnalytics() {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const bar = () => {
    if (isMobile) {
      return 10;
    } else if (isTablet) {
      return 30;
    } else {
      return 30;
    }
  };
  return (
    <Card className="border-0 bg-goldie-300">
      <CardHeader>
        <CardTitle className="">Order Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="orders max-h-[300px] min-h-[200px] w-full pl-0 lg:hidden"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeOpacity={0.9}
              stroke="hsl(0deg 0% 28.5% / 50%)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickCount={10}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" color="#000" />}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-desktop)"
              radius={0}
              barSize={bar()}
            />
          </BarChart>
        </ChartContainer>

        {/* DESKTOP */}
        <ChartContainer
          config={chartConfig}
          className="orders hidden min-h-[200px] w-full pl-0 lg:block lg:max-h-[400px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeOpacity={0.9}
              stroke="hsl(0deg 0% 28.5% / 50%)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickCount={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-desktop)"
              radius={0}
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
