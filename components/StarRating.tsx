import { useEffect, useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { MdStarOutline } from "react-icons/md";
import { twMerge } from "tailwind-merge";
type StarRatingProp = {
  maxRating?: number;
  defaultRating?: number;
  iconSize: number;
  canRate: boolean;
  onSetRating?: any;
  iconColor?: string | any;
};

const StarRating: React.FC<StarRatingProp> = ({
  maxRating = 5,
  defaultRating,
  iconSize,
  canRate,
  onSetRating,
  iconColor,
}) => {
  const [rating, setRating] = useState(defaultRating ?? 2);
  const [tempRating, setTempRating] = useState(0);

  useEffect(() => {
    setRating(defaultRating ?? 2);
  }, [defaultRating]);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className="flex gap-0">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          onRate={canRate ? () => handleRating(i + 1) : () => null}
          full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          onHoverIn={canRate ? () => setTempRating(i + 1) : () => null}
          onHoverOut={canRate ? () => setTempRating(0) : () => null}
          iconSize={iconSize}
          iconColor={iconColor}
          key={i}
        />
      ))}
    </div>
  );
};

export default StarRating;

type StarProp = {
  onRate: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  full: any;
  iconSize: number;
  iconColor: string;
};
const Star: React.FC<StarProp> = ({
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
      className="cursor-poiner"
    >
      {full ? (
        <IoMdStar
          size={iconSize}
          className={twMerge("text-[#FE6600]", iconColor)}
        />
      ) : (
        <MdStarOutline
          size={iconSize}
          className={twMerge("text-[#797979]", iconColor)}
        />
      )}
    </div>
  );
};
