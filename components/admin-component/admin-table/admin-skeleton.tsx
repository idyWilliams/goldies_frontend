import React from "react";

const TableSkeletonLoader = () => {
  return (
    <div className="rounded-md shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full bg-[#fff]">
          <thead>
            <tr className="bg-brand-200">
              {[...Array(6)].map((_, index) => (
                <th
                  key={index}
                  className="p-4 text-left capitalize text-brand-100"
                >
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t transition-colors odd:bg-brand-100 odd:bg-opacity-20"
              >
                {[...Array(6)].map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    <div
                      className={`h-4 animate-pulse rounded bg-gray-200 ${
                        colIndex === 0
                          ? "w-24"
                          : colIndex === 5
                            ? "w-8"
                            : "w-16"
                      }`}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;
