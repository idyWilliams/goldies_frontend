"use client";

import React from "react";
import { CalendarRange } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeSelectorProps {
  periodType: string;
  dateRange: {
    start: string;
    end: string;
  };
  onPeriodChange: (period: string) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  periodType,
  dateRange,
  onPeriodChange,
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <CalendarRange size={18} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Period:</span>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <Select value={periodType} onValueChange={onPeriodChange}>
          <SelectTrigger className="h-9 w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>

        {periodType !== "all" && (
          <div className="flex-1 text-sm text-gray-500">
            {dateRange.start} to {dateRange.end}
          </div>
        )}
        {periodType === "all" && (
          <div className="flex-1 text-sm text-gray-500">
            All historical data
          </div>
        )}
      </div>
    </div>
  );
};
