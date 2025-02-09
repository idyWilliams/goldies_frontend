import { ISubCategory, UCategory } from "@/interfaces/product.interface";
import { Add, Minus } from "iconsax-react";
import Checkbox from "./Checkbox";
import RangeInput from "./RangeInput";
import { Button } from "../ui/button";

interface FilterCompProps {
  isPending: boolean;
  categories: UCategory[];
  openIndexes: number[];
  handleClick: (index: number) => void;
  selectedIds: Set<string>;
  handleSelectedItem: (id: string, isChecked: boolean) => void;
  handleRangeChange: (min: number, max: number) => void;
  applyFilter: () => void;
  handleReset: () => void;
  onClose?: () => void;
}

const FilterComp = ({
  isPending,
  categories,
  openIndexes,
  handleClick,
  selectedIds,
  handleSelectedItem,
  handleRangeChange,
  applyFilter,
  handleReset,
  onClose,
}: FilterCompProps) => {
  const handleApplyFilter = () => {
    applyFilter();
    onClose!();
  };

  const handleResetFilter = () => {
    handleReset();
    onClose!();
  };
  return (
    <div className="w-full">
      <div className="space-y-3">
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="mb-3 animate-pulse border-t border-gray-200 pt-3"
              >
                <div className="h-5 w-2/3 rounded-md bg-gray-300"></div>
              </div>
            ))
          : categories?.map((cat, index) => {
              if (!cat?.subCategories?.length) return null;

              const isOpen = openIndexes.includes(index);

              return (
                <div className="border-t border-neutral-200 pt-3" key={index}>
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => handleClick(index)}
                  >
                    <span className="font-semibold capitalize text-neutral-800">
                      {cat?.name}
                    </span>
                    {isOpen ? <Minus /> : <Add />}
                  </div>

                  <div
                    className={`mt-3 space-y-4 ${isOpen ? "block" : "hidden"}`}
                  >
                    {cat?.subCategories?.map((sub: ISubCategory, i) => (
                      <Checkbox
                        key={i}
                        id={sub._id}
                        label={sub.name}
                        isChecked={selectedIds.has(sub._id)}
                        onCheckboxChange={handleSelectedItem}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        <div className="border-t border-neutral-200 pt-3">
          <label className="block font-semibold capitalize text-neutral-800">
            Price
          </label>
          <RangeInput min={0} max={1000} onChange={handleRangeChange} />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-7">
          <Button
            className="rounded-md bg-neutral-900 p-3 text-white"
            onClick={handleApplyFilter}
          >
            Filter
          </Button>
          <Button
            onClick={handleResetFilter}
            className="rounded-md border border-red-600 bg-transparent p-3 text-red-600 hover:bg-transparent"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
