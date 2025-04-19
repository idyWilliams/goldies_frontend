
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header section */}
      <section className="mb-5 w-full rounded-xl bg-transparent px-4 py-6 pt-6 lg:bg-white lg:p-6 lg:shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="mt-2 h-4 w-36" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        {/* Overview cards skeleton */}
        <div className="grid w-full gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="w-full border shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="mt-4 h-4 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts skeleton - Mobile & Tablet */}
      <div className="space-y-6 px-4 xl:hidden">
        <Card className="rounded-xl border shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <Card key={item} className="rounded-xl border shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {[1, 2].map((item) => (
          <Card key={item} className="rounded-xl border shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts skeleton - Desktop */}
      <div className="hidden space-y-6 px-4 xl:block">
        <Card className="rounded-xl border shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-72 w-full" />
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <Card className="rounded-xl border shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <Card className="rounded-xl border shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};