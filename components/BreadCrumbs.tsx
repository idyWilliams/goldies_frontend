import Link from "next/link";
import { RxSlash } from "react-icons/rx";
type itemsType = {
  name: string | undefined;
  link: string;
  fnx?: any;
};
type BreadCrumbType = {
  items: Array<itemsType>;
};
const BreadCrumbs = ({ items }: BreadCrumbType) => {
  return (
    <div className="text-secondary relative flex flex-1 flex-wrap items-center gap-x-1 rounded-none py-1 text-sm text-white">
      {items.map((item, index) =>
        index !== items.length - 1 ? (
          <div key={index} className="flex items-center  gap-x-3 rounded-none">
            <div
              key={index}
              className="flex items-center gap-x-2 rounded-none text-[#fcfaf0]"
            >
              <Link href={item.link} onClick={item.fnx}>
                <button className="rounded-none text-sm font-normal capitalize leading-[24px] hover:text-main sm:text-base">
                  {item.name}
                </button>
              </Link>
              <RxSlash />
            </div>
          </div>
        ) : (
          <button
            key={index}
            className="rounded-md text-sm capitalize leading-[24px] text-main hover:text-main sm:text-base "
          >
            {item.name}
          </button>
        ),
      )}
    </div>
  );
};
export default BreadCrumbs;
