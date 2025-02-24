import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";
import {
  handleNext,
  handlePaginateClick,
  handlePrev,
} from "@/helper/paginationFxn";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import EachElement from "@/helper/EachElement";
import { cn } from "@/lib/utils";

type AdminPaginationPropTypes = {
  totalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const AdminPagination = ({
  totalPage,
  page,
  setPage,
}: AdminPaginationPropTypes) => {
  // Function to generate the range of visible page buttons
  const getVisiblePages = () => {
    const visiblePages = 5; // Number of visible page buttons
    const halfVisible = Math.floor(visiblePages / 2);
    let start = Math.max(1, page - halfVisible);
    let end = Math.min(totalPage, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-4 bg-white px-4 py-3 sm:px-6">
      <Pagination>
        <PaginationContent className="gap-2">
          {/* Previous Button */}
          <PaginationItem>
            <Button
              disabled={page === 1}
              size={"icon"}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100 disabled:text-neutral-400",
              )}
              onClick={() => handlePrev(page, setPage)}
            >
              <RxCaretLeft size={24} />
            </Button>
          </PaginationItem>

          {/* First Page Button */}
          {!visiblePages.includes(1) && (
            <PaginationItem>
              <Button
                size={"icon"}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100",
                  page === 1 && "bg-goldie-300 text-black",
                )}
                onClick={() => setPage(1)}
              >
                1
              </Button>
            </PaginationItem>
          )}

          {/* Ellipsis for hidden pages before the visible range */}
          {!visiblePages.includes(1) && (
            <PaginationItem>
              <span className="mx-1">...</span>
            </PaginationItem>
          )}

          {/* Visible Page Buttons */}
          <EachElement
            of={visiblePages}
            render={(item: number, index: number) => (
              <PaginationItem key={index}>
                <Button
                  size={"icon"}
                  className={cn(
                    "inline-flex h-8 w-8 text-sm items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100",
                    page === item && "bg-goldie-300 text-black",
                  )}
                  onClick={() => handlePaginateClick(item - 1, page, setPage)}
                >
                  {item}
                </Button>
              </PaginationItem>
            )}
          />

          {/* Ellipsis for hidden pages after the visible range */}
          {!visiblePages.includes(totalPage) && (
            <PaginationItem>
              <span className="mx-1">...</span>
            </PaginationItem>
          )}

          {/* Last Page Button */}
          {!visiblePages.includes(totalPage) && (
            <PaginationItem>
              <Button
                size={"icon"}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100",
                  page === totalPage && "bg-goldie-300 text-black",
                )}
                onClick={() => setPage(totalPage)}
              >
                {totalPage}
              </Button>
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <Button
              disabled={page === totalPage}
              size={"icon"}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100 disabled:text-neutral-400",
              )}
              onClick={() => handleNext(page, totalPage, setPage)}
            >
              <RxCaretRight size={24} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminPagination;
