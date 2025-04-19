// SaleChart.tsx
import React, { useState } from "react";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/helper/formatCurrency";
import { WalletMoney } from "iconsax-react";

interface SaleChartProps {
  data?: Array<{
    month: string;
    revenue: number;
  }>;
}

const formatMonthName = (month: string) => {
  // If month is already a three-letter abbreviation, return it
  if (month.length <= 3) return month;

  // Otherwise format it to three letters
  return month.slice(0, 3);
};

export const SaleChart = ({ data = [] }: SaleChartProps) => {
  const [timeRange, setTimeRange] = useState("This Year");

  // Ensure we have data to display
  const chartData =
    data.length > 0
      ? data
      : Array(12)
          .fill(0)
          .map((_, i) => ({
            month: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ][i],
            revenue: 0,
          }));

  // Calculate total revenue
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  // Find highest month
  const highestMonth = chartData.reduce(
    (prev, current) => (prev.revenue > current.revenue ? prev : current),
    { month: "", revenue: 0 },
  );

  // Custom tooltip component for chart
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-3 shadow-md">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="mt-1 font-semibold text-brand-200">
            {formatCurrency(payload[0].value as number, "en-NG")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <WalletMoney
              size="22"
              // color="brand-200"
              className="text-brand-200"
            />
            <CardTitle className="text-lg font-bold text-gray-800">
              Revenue Report
            </CardTitle>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Monthly sales performance
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none">
            <Calendar size={16} />
            <span>{timeRange}</span>
            <ChevronDown size={16} className="opacity-70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTimeRange("This Year")}>
              This Year
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("Last 6 Months")}>
              Last 6 Months
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("Last 3 Months")}>
              Last 3 Months
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 lg:grid-cols-[1fr_3fr]">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 p-4"
            >
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="mt-2 text-2xl font-bold text-gray-900">
                {formatCurrency(totalRevenue, "en-NG")}
              </div>

              <div className="mt-3 flex items-center gap-1 text-sm">
                <TrendingUp size={16} className="text-green-600" />
                <span className="font-medium text-green-600">
                  {totalRevenue > 0 ? "↑ Growing" : "No growth yet"}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg border bg-white p-4"
            >
              <div className="text-sm text-gray-600">Best Performing Month</div>
              <div className="mt-2 text-xl font-semibold text-gray-900">
                {highestMonth.month || "N/A"}
              </div>

              <div className="mt-2 font-medium text-brand-200">
                {highestMonth.revenue > 0
                  ? formatCurrency(highestMonth.revenue, "en-NG")
                  : "No data"}
              </div>
            </motion.div>
          </div>

          <div className="h-80 w-full lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.2}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatMonthName}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}k`
                  }
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  animationDuration={1500}
                  activeDot={{
                    r: 6,
                    fill: "#4F46E5",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
