import { Skeleton } from "@/components/ui/skeleton";

const ReviewSkeleton = () => {
  return (
    <div className="mt-3 rounded-md bg-neutral-100 p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" /> {/* Rating skeleton */}
        <Skeleton className="h-4 w-16" /> {/* Date skeleton */}
      </div>
      <Skeleton className="my-3 h-4 w-full" /> {/* Comment skeleton */}
      <Skeleton className="h-4 w-32" /> {/* Author skeleton */}
      <div className="mt-2 flex gap-2">
        <Skeleton className="h-9 w-16" /> {/* Edit button skeleton */}
        <Skeleton className="h-9 w-16" /> {/* Delete button skeleton */}
      </div>
    </div>
  );
};

export default ReviewSkeleton;
