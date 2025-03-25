"use client"
import { chunkArray } from "@/helper/chunkArray";
import { useState } from "react";
import Pagination from "@/components/custom-filter/Pagination";
import { cn } from "@/lib/utils";
import { initials } from "@/helper/initials";
import { BsFacebook, BsStarFill, BsStarHalf, BsTwitterX } from "react-icons/bs";
import { reviews } from "@/data/review.data";

let itemsPerPage = 6;

const TestimonialComp = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const handleNext = () => {
    if (currentPageIndex !== chunkArray(reviews, itemsPerPage).length) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  const handlePaginateClick = (index: number) => {
    setCurrentPageIndex(index + 1);
    window.scroll(0, 0);
  };

  const handlePrev = () => {
    if (currentPageIndex !== 1) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scroll(0, 0);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {chunkArray(reviews, itemsPerPage)[currentPageIndex - 1]?.map(
          (review: any, index: any) => {
            return (
              <blockquote
                key={index}
                className={`rounded-md border border-neutral-300 bg-white p-7 hover:shadow-md
                `}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-200 text-xl font-bold text-brand-100">
                      {initials(review.client)}
                    </span>
                    <span
                      className={cn(
                        "absolute -right-2 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white text-white",
                        review?.platform === "Facebook" && "bg-blue-700",
                        review?.platform === "twitter" && "bg-neutral-900",
                      )}
                    >
                      {review?.platform === "Facebook" && (
                        <BsFacebook size={14} />
                      )}
                      {review?.platform === "twitter" && (
                        <BsTwitterX size={14} />
                      )}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-[1.5] text-brand-200">
                      {review.client}
                    </h3>
                    <div className="flex items-center justify-center gap-1">
                      <BsStarFill size={18} className="text-orange-500" />
                      <BsStarFill size={18} className="text-orange-500" />
                      <BsStarFill size={18} className="text-orange-500" />
                      <BsStarFill size={18} className="text-orange-500" />
                      <BsStarHalf size={18} className="text-orange-500" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 leading-[150%] text-brand-200">
                  {review.comment}
                </p>
              </blockquote>
            );
          },
        )}
      </div>

      <Pagination
        className="mx-auto bg-transparent"
        onNext={handleNext}
        onPrev={handlePrev}
        onPaginateClick={handlePaginateClick}
        itemsPerPage={itemsPerPage}
        currentPageIndex={currentPageIndex}
        arr={reviews}
      />
    </>
  );
};

export default TestimonialComp;
