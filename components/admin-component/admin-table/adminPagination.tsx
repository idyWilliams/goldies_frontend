// components/AdminPagination.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface AdminPaginationPropTypes {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const AdminPagination: React.FC<AdminPaginationPropTypes> = ({
  totalPage,
  page,
  setPage,
}) => {
  const generatePagination = () => {
    // If total pages are 7 or less, show all pages
    if (totalPage <= 7) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    // Always include first and last page
    const firstPage = 1;
    const lastPage = totalPage;

    // If current page is among the first 3 pages
    if (page <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", lastPage];
    }

    // If current page is among the last 3 pages
    if (page >= totalPage - 2) {
      return [
        firstPage,
        "ellipsis",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        lastPage,
      ];
    }

    // If current page is somewhere in the middle
    return [
      firstPage,
      "ellipsis",
      page - 1,
      page,
      page + 1,
      "ellipsis",
      lastPage,
    ];
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const pageNumbers = generatePagination();

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {page} of {totalPage}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-1">
          {pageNumbers.map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === "ellipsis" ? (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled
                  className="cursor-default"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant={page === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(Number(pageNumber))}
                  className="min-w-8 px-3"
                >
                  {pageNumber}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPage}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminPagination;
