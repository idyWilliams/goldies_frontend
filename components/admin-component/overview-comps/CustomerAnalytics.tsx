// CustomersAnalytics.tsx
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Users, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomersAnalyticsProps {
  data?: Array<{
    month: string;
    customers: number;
  }>;
}

export const CustomersAnalytics = ({ data = [] }: CustomersAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState("This Year");

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
            customers: 0,
          }));

  // Calculate total customers
  const totalCustomers = chartData.reduce(
    (sum, item) => sum + item.customers,
    0,
  );

  // Find highest month
  const highestMonth = chartData.reduce(
    (prev, current) => (prev.customers > current.customers ? prev : current),
    { month: "", customers: 0 },
  );

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
            {payload[0].value} New Customers
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
            <Users size={18} className="text-brand-200" />
            <CardTitle className="text-lg font-bold text-gray-800">
              Customer Analytics
            </CardTitle>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Monthly customer acquisition
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
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 p-4"
          >
            <div className="text-sm text-gray-600">Total Customers</div>
            <div className="mt-2 text-2xl font-bold text-gray-900">
              {totalCustomers}
            </div>

            <div className="mt-3 flex items-center gap-1 text-sm">
              <Users size={16} className="text-brand-200" />
              <span className="font-medium text-brand-200">
                {totalCustomers > 0 ? "Active Userbase" : "No customers yet"}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-white p-4"
          >
            <div className="text-sm text-gray-600">Peak Acquisition</div>
            <div className="mt-2 text-xl font-semibold text-gray-900">
              {highestMonth.month || "N/A"}
            </div>

            <div className="mt-2 font-medium text-brand-200">
              {highestMonth.customers > 0
                ? `${highestMonth.customers} New Customers`
                : "No data"}
            </div>
          </motion.div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>

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

              <Line
                type="monotone"
                dataKey="customers"
                stroke="#4F46E5"
                strokeWidth={3}
                activeDot={{
                  r: 6,
                  fill: "#4F46E5",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                dot={{ r: 4, fill: "#4F46E5", stroke: "#fff", strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
