import Image from "next/image";
import cs from "../../../public/assets/AT0213_coconut-cream-cake_s4x3.webp";
import { createColumnHelper } from "@tanstack/react-table";
import { SubategoriesColumns } from "@/utils/categoryTypes";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { Edit, Trash } from "iconsax-react";

const columnHelper = createColumnHelper<SubategoriesColumns>();

export const columns = [
  columnHelper.accessor((row) => row, {
    id: "SubImage",
    cell: (info) => {
      return (
        <div className="">
          <Image
            src={cs}
            // src={info.cell.row.original.image} // Switch to this once api is available
            alt={info.cell.row.original.subCategoryName}
            width={150}
            height={150}
            className="h-[80px] w-[100px] object-cover"
          />
        </div>
      );
    },
    header: () => <span> </span>,
  }),
  columnHelper.accessor("subCategoryName", {
    header: () => <span>Subcategory</span>,

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("description", {
    header: () => <span>Description</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "status",
    cell: (info) => <StatusBar status={info.cell.row.original.status} />,
    header: () => <span>Status</span>,
  }),

  columnHelper.accessor((row) => row, {
    id: "action",
    cell: (info) => (
      <div className="space-x-2">
        <span
          // onClick={() => handleEdit(item)}
          className="cursor-pointer text-blue-600"
        >
          <Edit size={24} />
        </span>
        <span
          // onClick={() => handleDelete(item)}
          className="cursor-pointer text-red-600"
        >
          <Trash size={24} />
        </span>
      </div>
    ),
    header: () => <span>Actions</span>,
    footer: (info) => info.column.id,
  }),
];
