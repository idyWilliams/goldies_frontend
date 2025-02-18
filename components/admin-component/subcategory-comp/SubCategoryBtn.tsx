import useBoundStore from "@/zustand/store";
import React from "react";

export default function SubCategoryBtn({
  isValid,
  handleClose,
  isPending,
}: {
  isValid: boolean;
  handleClose: () => void;
  isPending: {
    editing: boolean;
    creating: boolean;
  };
}) {
  const activeSubcategory = useBoundStore((state) => state.activeSubcategory);
  const isLoading = isPending.creating || isPending.editing;

  return (
    <div className="mt-4 flex gap-2">
      <button
        disabled={!isValid || isLoading}
        type="submit"
        className="rounded-md bg-neutral-900 px-6 py-2 text-sm font-semibold text-goldie-300 disabled:opacity-75 disabled:hover:cursor-not-allowed"
      >
        {isLoading
          ? "Loading..."
          : activeSubcategory
            ? "Save Changes"
            : "Create"}
      </button>
      <button
        type="button"
        onClick={handleClose}
        className="rounded-md bg-goldie-300 px-6 py-2 text-sm font-semibold text-neutral-900"
      >
        Cancel
      </button>
    </div>
  );
}
