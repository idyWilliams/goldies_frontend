import { Overview } from "@/utils/adminData";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <section className="w-full bg-main px-4 py-6 pt-[65px] lg:bg-white lg:p-8 lg:pt-24">
        <div className="bg-main lg:p-8">
          <p className="font-bold">Today&apos;s Sales</p>
          <p className="mb-4 text-[13px]">Sales summary</p>

          <div className="grid grid-cols-2 gap-4 text-main lg:grid-cols-4 xl:gap-6">
            {Overview.map((data: any, index: number) => {
              return (
                <div key={index} className="bg-black p-4">
                  <data.icon size={30} className="font-bold" />
                  <p className="mt-2 text-lg font-bold">{data.value}</p>
                  <p className="text-xs">{data.title}</p>
                  <div className="my-2 mb-4 border-b border-main border-opacity-50"></div>
                  <p className="text-xs">{data.info}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3 bg-main p-4 lg:p-8">
          <h3>Top Products</h3>
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Popularity</td>
                <td>Sales</td>
              </tr>
            </thead>
          </table>
        </div>
      </section>
    </>
  );
}
