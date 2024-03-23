import React from "react";
import { useTable, Column } from "react-table";
interface TableProps<T extends object> {
  columns: readonly Column<object>[];
  data: any;
}

function Table<T extends object>({ columns, data }: TableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="w-full border-collapse">
      <thead>
        {headerGroups.map((headerGroup, index) => (
          //@ts-ignore
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th
                //@ts-ignore
                key={column.id}
                {...column.getHeaderProps()}
                className="border-b border-black p-2 text-left"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            //@ts-ignore
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <td
                  //@ts-ignore
                  key={cellIndex}
                  {...cell.getCellProps()}
                  className="border-0 p-2"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
