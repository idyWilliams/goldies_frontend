import { Button } from "@/components/ui/button";
import { FolderAdd } from "iconsax-react";
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
    router.back();
  };
  return (
    <div className="flex items-center justify-between">
      <div className="items center flex gap-2 ">
        <FolderAdd variant="Bold" />
        <h1 className="text-lg font-extrabold uppercase">
          {editId ? "Edit Product" : "Create New Product"}
        </h1>
      </div>

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
          className="relative rounded-md bg-brand-200 px-10 py-2 text-sm text-brand-100 hover:bg-brand-200 disabled:pointer-events-none disabled:opacity-75"
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
