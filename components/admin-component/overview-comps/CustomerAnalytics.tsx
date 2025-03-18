"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useMediaQuery } from "react-responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
    label: "Customers",
    color: "#e4d064",
  },
} satisfies ChartConfig;

export function CustomersAnalytics() {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
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
    <Card className="border-0 bg-neutral-900">
      <CardHeader>
        <CardTitle className="text-brand-200 lg:mb-8">
          Customers Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="sales max-h-[300px] min-h-[200px] w-full pl-0 lg:hidden"
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
              strokeDasharray="3 3"
              opacity={0.5}
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
              content={<ChartTooltipContent indicator="dot" />}
            />
            {/* <ChartLegend
              verticalAlign="top"
              content={<ChartLegendContent color="#e4d064" />}
            /> */}
            <Bar
              dataKey="orders"
              fill="#e4d064"
              radius={[50, 50, 0, 0]}
              barSize={bar()}
            />
          </BarChart>
        </ChartContainer>

        {/* DESKTOP */}
        <ChartContainer
          config={chartConfig}
          className="sales hidden min-h-[200px] w-full pl-0 lg:block lg:max-h-[350px]"
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
              strokeDasharray="3 3"
              opacity={0.5}
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
            {/* <ChartLegend
              verticalAlign="top"
              content={<ChartLegendContent color="#e4d064" />}
            /> */}
            <Bar
              dataKey="orders"
              fill="#e4d064"
              radius={[50, 50, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
