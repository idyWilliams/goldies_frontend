// Dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Home, Moneys, Profile2User, ShoppingBag } from "iconsax-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getDashBoard,
  getExtendedDashBoard,
} from "@/services/hooks/admin/adminDashboard";

import { SaleChart } from "./overview-comps/SaleChart";
import { CategoryChart } from "./overview-comps/CategoryChart";
import { OrderAnalytics } from "./overview-comps/OrderAnalytics";
import { CustomersAnalytics } from "./overview-comps/CustomerAnalytics";
import { TopProducts } from "./overview-comps/TopProducts";
import { DashboardSkeleton } from "./dashboardSkeleton";
import { OverviewCard } from "./overview-comps/OverviewCard";

// Types for dashboard data
export interface TodaySummary {
  totalSales: {
    value: number;
    percentChange: number;
    yesterday: number;
  };
  totalOrders: {
    value: number;
    percentChange: number;
    yesterday: number;
  };
  newCustomers: {
    value: number;
    percentChange: number;
    yesterday: number;
  };
}

export interface DashboardData {
  todaySummary: TodaySummary;
  revenueReport: Array<{
    month: string;
    revenue: number;
  }>;
  categoryDistribution: Array<{
    name: string;
    value: number;
  }>;
  orderAnalytics: Array<{
    month: string;
    orders: number;
  }>;
  customerAnalytics: Array<{
    month: string;
    customers: number;
  }>;
  topProductSales: Array<{
    name: string;
    value: number;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const [animateCharts, setAnimateCharts] = useState(false);

  // Main dashboard data query
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["getDashBoard"],
    queryFn: getDashBoard,
  });

  // Extended dashboard data query
  const { data: extData, isLoading: extLoading } = useQuery({
    queryKey: ["getExtendedDashBoard"],
    queryFn: getExtendedDashBoard,
  });

  // Combined data
  const dashboardData: DashboardData | undefined = extData;

  // Trigger animations after initial render
  useEffect(() => {
    setTimeout(() => {
      setAnimateCharts(true);
    }, 500);
  }, []);

  // Handle loading state
  if (isLoading || extLoading) {
    return <DashboardSkeleton />;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h3 className="text-lg font-medium text-red-800">
            Unable to load dashboard
          </h3>
          <p className="mt-2 text-red-600">Please try again later</p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  console.log(extData, "extData");
  // Create overview cards data
  const overviewCards = [
    {
      title: "Total Sales",
      icon: Moneys,
      value: dashboardData?.todaySummary?.totalSales?.value || 0,
      increaseRate: dashboardData?.todaySummary?.totalSales?.percentChange || 0,
      lastValue: dashboardData?.todaySummary?.totalSales?.yesterday || 0,
      isPrice: true,
    },
    {
      title: "Total Orders",
      icon: ShoppingBag,
      value: dashboardData?.todaySummary?.totalOrders?.value || 0,
      increaseRate:
        dashboardData?.todaySummary?.totalOrders?.percentChange || 0,
      lastValue: dashboardData?.todaySummary?.totalOrders?.yesterday || 0,
      isPrice: false,
    },
    {
      title: "New Customers",
      icon: Profile2User,
      value: dashboardData?.todaySummary?.newCustomers?.value || 0,
      increaseRate:
        dashboardData?.todaySummary?.newCustomers?.percentChange || 0,
      lastValue: dashboardData?.todaySummary?.newCustomers?.yesterday || 0,
      isPrice: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 w-full rounded-xl bg-transparent px-4 py-6 pt-6 lg:bg-white lg:p-6 lg:shadow-sm"
      >
        <div className="rounded-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Home variant="Bold" className="text-brand-200" />
                <h1 className="text-xl font-bold text-gray-800">
                  Today&apos;s Performance
                </h1>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Sales and activity summary
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin/create-products")}
              className="bg-brand-200 transition-all hover:bg-brand-300 duration-300"
            >
              Create Product
            </Button>
          </div>

          {/* Overview cards */}
          <div className="hide-scrollbar w-full overflow-x-auto">
            <div className="grid w-full gap-4 md:grid-cols-3">
              {overviewCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <OverviewCard data={card} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Charts section - Mobile & Tablet */}
      <div className="space-y-6 px-4 xl:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={animateCharts ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SaleChart data={dashboardData?.revenueReport} />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={animateCharts ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CategoryChart data={dashboardData?.categoryDistribution} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={animateCharts ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TopProducts data={dashboardData?.topProductSales} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animateCharts ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <OrderAnalytics data={dashboardData?.orderAnalytics} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animateCharts ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CustomersAnalytics data={dashboardData?.customerAnalytics} />
        </motion.div>
      </div>

      {/* Charts section - Desktop */}
      <div className="hidden space-y-6 px-4 xl:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={animateCharts ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SaleChart data={dashboardData?.revenueReport} />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={animateCharts ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CategoryChart data={dashboardData?.categoryDistribution} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={animateCharts ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OrderAnalytics data={dashboardData?.orderAnalytics} />
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateCharts ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CustomersAnalytics data={dashboardData?.customerAnalytics} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={animateCharts ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TopProducts data={dashboardData?.topProductSales} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
