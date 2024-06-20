import { ArrowLeft, GalleryImport } from "iconsax-react";
import Link from "next/link";
import React from "react";

type CategoryProps = {
  params: any;
};

const Page = ({ params }: CategoryProps) => {
  return (
    <>
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 ">
          <Link
            href={"/admin/manage-categories"}
            className="inline-flex cursor-pointer items-center gap-2"
          >
            <span>
              <ArrowLeft size="24" />
            </span>
            <h1 className="text-xl font-bold">Edit Category</h1>
          </Link>
          <button className="bg-neutral-900 px-4 py-2 text-goldie-300">
            New Category
          </button>
        </div>

        <div>
          <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-white py-6">
            <span>
              <GalleryImport size={42} />
            </span>
            <label htmlFor="file">Drop or click here to add image</label>
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              accept=".jpeg .png"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
