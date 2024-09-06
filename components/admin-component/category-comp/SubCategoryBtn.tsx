import React from "react";

export default function SubCategoryBtn({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <div className="mt-4 flex gap-2">
      <button
        type="submit"
        className="rounded-md bg-neutral-900 px-6 py-2 text-sm font-semibold text-goldie-300"
      >
        Create
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
