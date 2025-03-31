import { useEffect, useState } from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { MdStarOutline } from "react-icons/md";

type StarRatingProps = {
  maxRating?: number;
  defaultRating?: number;
  iconSize: number;
  canRate: boolean;
  onSetRating?: (rating: number) => void;
  iconColor?: string;
  allowHalfStars?: boolean; // New prop to enable/disable half stars
};

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  defaultRating = 0,
  iconSize,
  canRate,
  onSetRating,
  iconColor = "text-[#FE6600]",
  allowHalfStars = true, // Default to true
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null); // Track hover position for half stars

  useEffect(() => {
    setRating(defaultRating);
  }, [defaultRating]);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    if (onSetRating) {
      onSetRating(newRating);
    }
  };

  const handleStarHover = (starIndex: number, event: React.MouseEvent) => {
    if (!canRate) return;

    const starElement = event.currentTarget as HTMLElement;
    const rect = starElement.getBoundingClientRect();
    const isLeftHalf = event.clientX - rect.left < rect.width / 2;

    setHoverPosition(isLeftHalf ? starIndex + 0.5 : starIndex + 1);
    setTempRating(isLeftHalf ? starIndex + 0.5 : starIndex + 1);
  };

  const handleMouseLeave = () => {
    setTempRating(0);
    setHoverPosition(null);
  };

  return (
    <div className="flex gap-0" role="radiogroup" aria-label="Star Rating">
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const isFilled = tempRating
          ? tempRating >= starValue
          : rating >= starValue;
        const isHalfFilled =
          allowHalfStars &&
          (tempRating
            ? tempRating > i && tempRating < starValue
            : rating > i && rating < starValue);

        return (
          <div
            key={i}
            onMouseMove={canRate ? (e) => handleStarHover(i, e) : undefined}
            onMouseLeave={canRate ? handleMouseLeave : undefined}
            onClick={
              canRate
                ? () => handleRating(hoverPosition || starValue)
                : undefined
            }
            className="relative cursor-pointer"
            role="radio"
            aria-checked={isFilled || isHalfFilled}
            tabIndex={0}
          >
            {isFilled ? (
              <IoMdStar size={iconSize} className={iconColor} />
            ) : isHalfFilled ? (
              <>
                <IoMdStarOutline size={iconSize} className="text-[#797979]" />
                <IoMdStarHalf
                  size={iconSize}
                  className={`absolute left-0 top-0 ${iconColor}`}
                />
              </>
            ) : (
              <MdStarOutline size={iconSize} className="text-[#797979]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
