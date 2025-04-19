// CategoryChart.tsx
"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { ChartPieIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaChartPie } from "react-icons/fa";

interface CategoryChartProps {
  data?: Array<{
    name: string;
    value: number;
  }>;
}

export const CategoryChart = ({ data = [] }: CategoryChartProps) => {
  // Define colors for the chart
  const COLORS = [
    "#4F46E5",
    "#2ECC71",
    "#F5A623",
    "#9B51E0",
    "#E03131",
    "#95A5A6",
  ];

  // Check if we have valid data or use placeholders
  const chartData =
    data && data.length > 0 && data.some((item) => item.value > 0)
      ? data.filter((item) => item.value > 0)
      : [
          { name: "Kid's Cake", value: 35 },
          { name: "Valentine", value: 25 },
          { name: "Funerals", value: 15 },
          { name: "Dark Chocolate", value: 25 },
        ];

  // Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-full rounded-xl border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <FaChartPie size={18} className="text-brand-200" />
          <CardTitle className="text-lg font-bold text-gray-800">
            Category Distribution
          </CardTitle>
        </div>
        <p className="mt-1 text-sm text-gray-500">Product category breakdown</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center">
          <div className="h-[180px] w-full max-w-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid w-full gap-3">
            {chartData.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-700">{entry.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {total > 0 ? Math.round((entry.value / total) * 100) : 0}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
