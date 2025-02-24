import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { CgSpinner } from "react-icons/cg";

type CreateProductHeaderPropType = {
  isSubmitting: boolean;
  editId: string;
};

const CreateProductHeader = ({
  isSubmitting,
  editId,
}: CreateProductHeaderPropType) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/admin/products");
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold">
        {editId ? "Edit Product" : "Create New Product"}
      </h1>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant={"secondary"}
          className="relative rounded-md bg-neutral-400 px-10 py-2 text-sm"
          onClick={handleBackClick}
        >
          Cancel
        </Button>
        <Button
          className="relative rounded-md bg-black px-10 py-2 text-sm text-goldie-300 disabled:pointer-events-none disabled:opacity-75"
          type="submit"
          disabled={isSubmitting}
        >
          <CgSpinner
            className={`${isSubmitting ? "block" : "hidden"} absolute left-[45%] top-[20%] h-6 w-6 animate-spin `}
          />

          <span className={`${isSubmitting ? "opacity-0" : "opacity-100"}`}>
            {editId ? "Save Changes" : "Create"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CreateProductHeader;
