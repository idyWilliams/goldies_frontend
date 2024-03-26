import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import React from "react";
import Table from "../Table";

type Data = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function AdminTable() {
  const [data, setData] = React.useState<Data[]>([]);

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },

    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    // {
    //   accessorFn: (row: any) => row.lastName,
    //   header: () => <span>Last Name</span>,
    // },
  ];

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return;
  <table>
    <thead></thead>
    <tbody>
      <tr>
        {/* <th colSpan={header.colSpan} key={column.id}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th> */}
      </tr>
    </tbody>
  </table>;
}

// import React from "react";
// import { useTable, Column } from "react-table";
// interface TableProps<T extends object> {
//   columns: readonly Column<object>[];
//   data: any;
// }

// function AdminTable<T extends object>({ columns, data }: TableProps<T>) {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   return (
//     <table {...getTableProps()} className="w-full border-collapse">
//       <thead>
//         {headerGroups.map((headerGroup, index) => (
//           //@ts-ignore
//           <tr key={index} {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column, index) => (
//               <th
//                 //@ts-ignore
//                 key={column.id}
//                 {...column.getHeaderProps()}
//                 className="border-b border-black p-2 text-left"
//               >
//                 {column.render("Header")}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, index) => {
//           prepareRow(row);
//           return (
//             //@ts-ignore
//             <tr key={index} {...row.getRowProps()}>
//               {row.cells.map((cell, cellIndex) => (
//                 <td
//                   //@ts-ignore
//                   key={cellIndex}
//                   {...cell.getCellProps()}
//                   className="border-0 p-2"
//                 >
//                   {cell.render("Cell")}
//                 </td>
//               ))}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }

// export default AdminTable;
