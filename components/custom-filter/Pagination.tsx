import { chunkArray } from "@/utils/helpers/chunkArray";
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
};

const Pagination: React.FC<PaginationProps> = ({
  onNext,
  onPrev,
  onPaginateClick,
  currentPageIndex,
  itemsPerPage,
  arr,
  className,
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
          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-800",
          currentPageIndex === 1 ? "text-neutral-400" : "",
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
                "inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-800",
                currentPageIndex === index + 1 && "bg-main text-black",
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
          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-800",
          currentPageIndex === chunkArray(arr, itemsPerPage).length &&
            "text-neutral-400",
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
