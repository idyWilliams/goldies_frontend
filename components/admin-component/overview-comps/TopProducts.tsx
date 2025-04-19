// TopProducts.tsx
"use client";

import React from "react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopProductsProps {
  data?: Array<{
    name: string;
    value: number;
  }>;
}

export const TopProducts = ({ data = [] }: TopProductsProps) => {
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  // Check if we have valid data or use placeholders
  const chartData =
    data && data.length > 0 && data.some((item) => item.value > 0)
      ? data
      : [
          { name: "Dark Chocolate Cakes", value: 31 },
          { name: "Kid's Cake", value: 3 },
        ];

  // Sort products by value in descending order
  const sortedData = [...chartData].sort((a, b) => b.value - a.value);

  // Get top product
  const topProduct =
    sortedData.length > 0 ? sortedData[0] : { name: "No data", value: 0 };

  return (
    <Card className="h-full rounded-xl border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-brand-200" />
          <CardTitle className="text-lg font-bold text-gray-800">
            Top Products
          </CardTitle>
        </div>
        <p className="mt-1 text-sm text-gray-500">Best performing items</p>
      </CardHeader>

      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 p-4"
        >
          <div className="text-sm text-gray-600">Best Seller</div>
          <div className="mt-1 line-clamp-1 text-xl font-semibold text-gray-900">
            {topProduct.name}
          </div>

          <div className="mt-3 flex items-center gap-1 text-sm">
            <TrendingUp size={16} className="text-brand-200" />
            <span className="font-medium text-brand-200">
              {topProduct.value} Orders
            </span>
          </div>
        </motion.div>

        <div className="space-y-4">
          {sortedData.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="max-w-[70%] truncate text-sm font-medium text-gray-700">
                  {product.name}
                </span>
                <span className="text-sm font-semibold text-brand-200">
                  {product.value} orders
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                    width: `${Math.min(100, (product.value / topProduct.value) * 100)}%`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
