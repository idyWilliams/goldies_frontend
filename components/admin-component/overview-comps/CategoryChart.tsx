import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
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
  { category: "milestone cakes", sales: 275, fill: "#13B136" },
  { category: "themed cakes", sales: 200, fill: "#FFCC00" },
  { category: "kids cakes", sales: 187, fill: "#E4D064" },
  { category: "cupcakes", sales: 173, fill: "#E03131" },
];

const chartConfig = {
  sales: {
    label: "Sales Rate",
  },
  milestone: {
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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cake Category Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <EachElement
          of={chartData}
          render={(item: any, index: number) => (
            <div>
              <span
                className={cn("h-4 w-4 rounded-full", `bg-[${item?.fill}]`)}
              ></span>
            </div>
          )}
        />
      </CardFooter>
    </Card>
  );
}
