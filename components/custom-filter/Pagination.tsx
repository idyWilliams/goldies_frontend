import { chunkArray } from "@/helper/chunkArray";
import React from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

type PaginationProps = {
  onPrev: any;
  onNext: any;
  onPaginateClick: any;
  currentPageIndex: number;
  itemsPerPage: number;
  arr: any[];
  className?: string;
  buttonClassName?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  onNext,
  onPrev,
  onPaginateClick,
  currentPageIndex,
  itemsPerPage,
  arr,
  className,
  buttonClassName,
}) => {
  return (
    <div
      className={twMerge(
        "mt-10 flex items-center justify-center gap-2 bg-white px-4 py-3 sm:px-6",
        className,
      )}
    >
      <button
        onClick={onPrev}
        className={twMerge(
          "inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 text-brand-200",
          currentPageIndex === 1 ? "text-brand-200" : "",
        )}
      >
        <RxCaretLeft size={32} />
      </button>
      <div className="pagination flex items-center gap-1">
        {chunkArray(arr, itemsPerPage).map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => onPaginateClick(index)}
              className={twMerge(
                "inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 bg-brand-100 text-brand-200",
                currentPageIndex === index + 1 && "bg-brand-200 text-brand-100",
              )}
            >
              <span className="px-1.5 text-sm">{index + 1}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className={twMerge(
          "inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 text-brand-200",
          currentPageIndex === chunkArray(arr, itemsPerPage).length &&
            "text-brand-200",
        )}
      >
        <span className="">
          <RxCaretRight size={32} />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
