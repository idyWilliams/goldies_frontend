import { Overview, topProduct } from "@/utils/adminData";
import React from "react";
import Card from "../Card";
import Table from "../Table";
import { Column } from "react-table";

type Data = {
  id: number;
  name: string;
  age: number;
};

const columns: readonly Column<object>[] = [
  {
    Header: "#",
    accessor: (row: any) => {
      console.log(row, "row");
      return <span>0{row.id}</span>;
    },
  },
  { Header: "Name", accessor: "productName" },
  {
    Header: "Popularity",
    accessor: (row: any) => {
      return (
        <div className="mr-6 h-2 w-full overflow-hidden rounded-[50px] bg-[#EDE098]">
          <div
            className="h-full rounded-[50px] bg-black"
            style={{ width: `${row.percent}%` }}
          ></div>
        </div>
      );
    },
  },
  {
    Header: "Sales",
    accessor: (row: any) => {
      return <span>{row.sale}%</span>;
    },
  },
];

const Tcolumns: readonly Column<object>[] = [
  {
    Header: "#",
    accessor: (row: any) => {
      console.log(row, "row");
      return <span>0{row.id}</span>;
    },
  },
  { Header: "Name", accessor: "productName" },
  {
    Header: "Sales",
    accessor: (row: any) => {
      return <span>{row.sale}%</span>;
    },
  },
];

const data = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "Doe", age: 35 },
];

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
                <Card key={index} className="bg-black p-4">
                  <data.icon size={30} className="font-bold" />
                  <p className="mt-2 text-lg font-bold">{data.value}</p>
                  <p className="text-xs">{data.title}</p>
                  <div className="my-2 mb-4 border-b border-main border-opacity-50"></div>
                  <p className="text-xs">{data.info}</p>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="mt-6 hidden h-[330px] bg-main md:block lg:p-8 ">
          <h3 className="font-bold">Top Products</h3>
          <Table columns={columns} data={topProduct} />
        </div>
        <div className="mt-6 md:hidden">
          <h3 className="font-bold">Top Products</h3>
          <Table columns={Tcolumns} data={topProduct} />
        </div>
      </section>
    </>
  );
}
