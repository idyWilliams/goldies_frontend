import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { SubategoriesColumns } from "@/utils/categoryTypes";
import StatusBar from "@/components/admin-component/category-comp/StatusBar";
import { Edit, Trash } from "iconsax-react";
import Placeholder from "../../../public/assets/placeholder3.png";
import {
  handleImageLoad,
  LoadedState,
  SetLoadedType,
} from "@/helper/handleImageLoad";

const columnHelper = createColumnHelper<SubategoriesColumns>();

export const getColumns = (
  onEdit: (item: any) => void,
  onDelete: (item: any) => void,
  isLoaded: LoadedState,
  setIsLoaded: SetLoadedType,
) => {
  const columns = [
    columnHelper.accessor((row) => row, {
      id: "SubImage",
      cell: (info) => {
        return (
          <div className="relative h-[80px] w-[100px]">
            {/* {!isLoaded[info.cell.row.original?._id] && (
              <Image
                src={Placeholder}
                alt="placeholder"
                placeholder="blur"
                priority
                fill
                className="absolute left-0 top-0 -z-10 animate-pulse object-cover object-center"
              />
            )} */}
            {/* ${isLoaded[info.cell.row.original?._id] ? "opacity-100" : "opacity-0"} */}

            <Image
              src={Placeholder}
              alt="placeholder"
              placeholder="blur"
              priority
              width={150}
              height={150}
              className=" animate-pulse object-cover object-center"
            />

            <Image
              src={info.cell.row.original?.image}
              alt={info.cell.row.original?.name}
              fill
              className={` object-cover object-center   `}
            />

            {/* <Image
              src={info.cell.row.original?.image}
              alt={info.cell.row.original?.name}
              // width={150}
              // height={150}
              fill
              className={` object-cover object-center   ${isLoaded[info.cell.row.original?._id] ? "opacity-100" : "opacity-0"}`}
              onLoad={() =>
                handleImageLoad(info.cell.row.original?._id, setIsLoaded)
              }
            /> */}
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
