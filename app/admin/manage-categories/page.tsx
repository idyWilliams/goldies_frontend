"use client";
import { Information } from "iconsax-react";
import React, { useState } from "react";

const Page = () => {
  const [categories, setCategories] = useState<any[]>([]);
  return (
    <>
      {/* <div className="mt-[64px]" /> */}
      <section className="min-h-screen w-full bg-neutral-100 px-4 py-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 ">
          <h1 className="text-2xl font-bold">Categories</h1>
          <button className="bg-neutral-900 px-4 py-2 text-goldie-300">
            New Category
          </button>
        </div>

        <div className="flex w-full items-center justify-center bg-white py-6">
          <div className="flex flex-col items-center">
            <span className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 bg-opacity-15">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 bg-opacity-15 text-blue-500">
                <Information size="32" className="-rotate-180" />
              </span>
            </span>

            <h2 className="font-medium">No categories added yet</h2>
            <button className="mt-3 bg-goldie-300 px-4 py-2 text-neutral-900">
              Add Category
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
