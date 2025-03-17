import { useEffect, useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdStarOutline } from "react-icons/md";

type StarRatingProps = {
  maxRating?: number;
  defaultRating?: number;
  iconSize: number;
  canRate: boolean;
  onSetRating?: (rating: number) => void;
  iconColor?: string;
};

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  defaultRating = 0,
  iconSize,
  canRate,
  onSetRating,
  iconColor = "text-[#FE6600]",
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  useEffect(() => {
    setRating(defaultRating); // Update rating when defaultRating changes
  }, [defaultRating]);

  const handleRating = (rating: number) => {
    setRating(rating);
    if (onSetRating) {
      onSetRating(rating);
    }
  };

  return (
    <div className="flex gap-0" role="radiogroup" aria-label="Star Rating">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          onRate={canRate ? () => handleRating(i + 1) : undefined}
          full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          onHoverIn={canRate ? () => setTempRating(i + 1) : undefined}
          onHoverOut={canRate ? () => setTempRating(0) : undefined}
          iconSize={iconSize}
          iconColor={iconColor}
        />
      ))}
    </div>
  );
};

export default StarRating;

type StarProps = {
  onRate?: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  full: boolean;
  iconSize: number;
  iconColor: string;
};

const Star: React.FC<StarProps> = ({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  iconSize,
  iconColor,
}) => {
  return (
    <div
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      className="cursor-pointer"
      role="radio"
      aria-checked={full}
      tabIndex={0}
    >
      {full ? (
        <IoMdStar size={iconSize} className={iconColor} />
      ) : (
        <MdStarOutline size={iconSize} className="text-[#797979]" />
      )}
    </div>
  );
};
