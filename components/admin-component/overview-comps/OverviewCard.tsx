// components/OverviewCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatCurrency } from "@/helper/formatCurrency";

interface OverviewCardProps {
  data: {
    title: string;
    icon: any;
    value: number;
    increaseRate: number;
    lastValue: number;
    isPrice: boolean;
    periodLabel?: string; // Added to show the period comparison text
  };
}

export const OverviewCard = ({ data }: OverviewCardProps) => {
  const isPositiveChange = data.increaseRate >= 0;

  const formatValue = (value: number, isPrice: boolean) => {
    if (isPrice) {
      return formatCurrency(value, "en-NG");
    }
    return value.toLocaleString();
  };

  return (
    <Card className="overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-brand-100 to-brand-100 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-200 text-white shadow-md"
          >
            <data.icon size={24} />
          </motion.div>
          <h3 className="text-lg font-medium text-gray-800">{data.title}</h3>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl font-bold text-gray-900"
          >
            {formatValue(data.value, data.isPrice)}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`flex items-center gap-1 rounded-full px-3 py-1 ${
              isPositiveChange
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            <span className="text-sm font-medium">
              {Math.abs(data.increaseRate)}%
            </span>
            {isPositiveChange ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
          </motion.div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500">
        {isPositiveChange ? "Increased from" : "Decreased from"}{" "}
        {formatValue(data.lastValue, data.isPrice)}{" "}
        {data.periodLabel || "previous period"}
      </CardFooter>
    </Card>
  );
};
