import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import {
  handleNext,
  handlePaginateClick,
  handlePrev,
} from "@/helper/paginationFxn";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import EachElement from "@/helper/EachElement";

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
  return (
    <>
      <div className="mt-10 flex w-full flex-col items-center gap-4 bg-white px-4 py-3 sm:px-6">
        <Pagination>
          <PaginationContent className="gap-2">
            <PaginationItem className="flex items-center  justify-center">
              <span
                className={`flex items-center justify-center ${page === 1 ? "cursor-not-allowed" : ""}`}
              >
                <Button
                  disabled={page === 1}
                  className={twMerge(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100  disabled:text-neutral-400",
                  )}
                  onClick={() => handlePrev(page, setPage)}
                >
                  <span>
                    <RxCaretLeft size={32} />
                  </span>
                </Button>
              </span>
            </PaginationItem>

            <EachElement
              of={new Array(totalPage).fill(null)}
              render={(item: any, index: number) => {
                return (
                  <PaginationItem>
                    <Button
                      className={twMerge(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100",
                        page === index + 1 && "bg-goldie-300 text-black",
                      )}
                      onClick={() => handlePaginateClick(index, page, setPage)}
                    >
                      {index + 1}
                    </Button>
                  </PaginationItem>
                );
              }}
            />

            <PaginationItem className=" flex items-center  justify-center  p-1">
              <span
                className={`flex items-center justify-center ${page === totalPage ? "cursor-not-allowed" : ""}`}
              >
                <Button
                  disabled={page === totalPage}
                  className={twMerge(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 hover:bg-goldie-100  disabled:text-neutral-400",
                  )}
                  onClick={() => handleNext(page, totalPage, setPage)}
                >
                  <span className="">
                    <RxCaretRight size={32} />
                  </span>
                </Button>
              </span>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default AdminPagination;
