// OrderAnalytics.tsx
"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { PackageIcon, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "react-responsive";

interface OrderAnalyticsProps {
  data?: Array<{
    month: string;
    orders: number;
  }>;
}

export const OrderAnalytics = ({ data = [] }: OrderAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState("This Year");
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Ensure we have data to display
  const chartData =
    data && data.length > 0
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
            orders: 0,
          }));

  // Calculate total orders
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);

  // Get bar size based on screen size
  const getBarSize = () => {
    if (isMobile) return 12;
    if (isTablet) return 30;
    return 40;
  };

  // Custom tooltip component
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
            {payload[0].value} Orders
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
            <PackageIcon size={18} className="text-brand-200" />
            <CardTitle className="text-lg font-bold text-gray-800">
              Order Analytics
            </CardTitle>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Monthly order performance
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 rounded-lg bg-gradient-to-br from-brand-100 to-brand-100 p-4"
        >
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">
            {totalOrders}
          </div>

          <div className="mt-3 flex items-center gap-1 text-sm">
            <PackageIcon size={16} className="text-brand-200" />
            <span className="font-medium text-brand-200">
              {totalOrders > 0 ? "Active Orders" : "No orders yet"}
            </span>
          </div>
        </motion.div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => value.substring(0, 3)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="orders"
                fill="#4F46E5"
                barSize={getBarSize()}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
