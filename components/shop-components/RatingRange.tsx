import { IRatingsCount } from "@/interfaces/product.interface";

const RatingRange = ({
  ratings,
  starValue,
}: {
  ratings: IRatingsCount;
  starValue: number;
}) => {
  const calculatePercentage = () => {
    if (ratings.total === 0) return 0;
    // Safely get the count for this star value (default to 0 if undefined)
    const count = ratings[starValue as keyof IRatingsCount] || 0;
    return (count / ratings.total) * 100;
  };

  return (
    <div className="flex items-center gap-1">
      <span className="w-4 text-xs">{starValue}</span>
      <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-3 rounded-full bg-goldie-300"
          style={{ width: `${calculatePercentage()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RatingRange;
