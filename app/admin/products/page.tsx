import React from "react";

type Data = {
  id: number;
  name: string;
  age: number;
};

export default function Page() {
  return (
    <>
      <section className="w-full bg-main px-4 py-6 pt-[65px] lg:bg-white lg:p-8 lg:pt-24">
        <h1 className="text-lg font-extrabold">Products</h1>
        <p className="text-xs">List of all available products created</p>
      </section>

      {/* <table>
        <thead>
          <tbody></tbody>
        </thead>
      </table> */}
    </>
  );
}
