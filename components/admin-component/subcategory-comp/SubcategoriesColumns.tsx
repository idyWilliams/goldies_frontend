import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { SubategoriesColumns } from "@/utils/categoryTypes";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { Edit, Trash } from "iconsax-react";
import Placeholder from "../../../public/assets/placeholder3.png";
import {
  handleImagesLoad,
  LoadedState,
  SetLoadedType,
} from "@/helper/handleImageLoad";

const columnHelper = createColumnHelper<SubategoriesColumns>();

export const getColumns = (
  onEdit: (item: any) => void,
  onDelete: (item: any) => void,
  isLoadedMemoized: LoadedState,
  setIsLoaded: SetLoadedType,
) => {
  const columns = [
    columnHelper.accessor((row) => row, {
      id: "SubImage",
      cell: (info) => {
        return (
          <div className="h-[80px] w-[100px]">
            {!isLoadedMemoized[info.cell.row.original?._id] && (
              <Image
                src={Placeholder}
                alt="placeholder"
                placeholder="blur"
                priority
                width={60}
                height={50}
                className="h-[80px] w-[100px] animate-pulse object-cover object-center"
              />
            )}

            <Image
              src={info.cell.row.original?.image}
              alt={info.cell.row.original?.name}
              width={150}
              height={150}
              className={`h-[80px] w-[100px] object-cover object-center  ${isLoadedMemoized[info.cell.row.original?._id] ? "opacity-100" : "opacity-0"} `}
              onLoad={() =>
                handleImagesLoad(info.cell.row.original?._id, setIsLoaded)
              }
            />
          </div>
        );
      },
      header: () => <span> </span>,
    }),
    columnHelper.accessor("name", {
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
            onClick={(e) => {
              e.stopPropagation();

              onEdit(info.cell.row.original);
            }}
            className="cursor-pointer text-blue-600 "
          >
            <Edit size={24} />
          </span>

          <span
            onClick={(e) => {
              e.stopPropagation();
              onDelete(info.cell.row.original);
            }}
            className="cursor-pointer text-red-600 "
          >
            <Trash size={24} />
          </span>
        </div>
      ),
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];
  return columns;
};
