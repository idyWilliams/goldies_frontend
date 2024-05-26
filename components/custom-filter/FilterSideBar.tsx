import { BsX } from "react-icons/bs";
import { IoList } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import FilterComp from "./FilterComp";

const FilterSidebar = ({
  className,
  showFilter,
  setShowFilter,
  data,
  min,
  max,
}: {
  className?: string;
  showFilter: boolean;
  setShowFilter: any;
  data: any[];
  min: number;
  max: number;
}) => {
  return (
    <div
      className={twMerge(
        "absolute -left-full top-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-md duration-300",
        className,
        showFilter && "left-0",
      )}
      onClick={() => setShowFilter(false)}
    >
      <div
        className="h-full w-[280px] bg-white px-4 py-5 sm:w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-2 text-neutral-500">
          <span className="inline-flex items-center gap-2 font-semibold">
            <span>
              <IoList size={20} />
            </span>
            Filter
          </span>

          <span className="cursor-pointer" onClick={() => setShowFilter(false)}>
            <BsX size={24} />
          </span>
        </div>
        <FilterComp min={min} max={max} />
      </div>
    </div>
  );
};

export default FilterSidebar;
