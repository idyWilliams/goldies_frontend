import { cn } from "@/helper/cn";
import React from "react";

type StatusBarProps = {
  status: boolean;
  className?: string;
};

const StatusBar: React.FC<StatusBarProps> = ({ status, className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2 py-0.5 text-base capitalize",
        className,
        // status === "active"
        status
          ? "rounded-full border border-green-600 bg-green-600 bg-opacity-20 text-green-600"
          : "rounded-full border border-red-600 bg-red-600 bg-opacity-20 text-red-600",
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          status ? "bg-green-600" : "bg-red-600",
        )}
      ></span>
      {status ? "Active" : "Inactive"}
    </div>
  );
};

export default StatusBar;
