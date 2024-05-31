"use client";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

type AccordionProp = {
  arr: any[];
};
export default function Accordion({ arr }: AccordionProp) {
  const [openIndex, setOpenIndex] = useState(null);
  const handleClick = (index: any) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  return (
    <div className="mt-4 space-y-3">
      {arr.map((item: any, i: number) => (
        <AccordionItem
          title={item.title}
          index={i}
          openIndex={openIndex}
          handleClick={handleClick}
          key={item.title}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

type AccordionItemProp = {
  children: React.ReactNode;
  title: string;
  index: number;
  openIndex: number | null;
  handleClick: (index: number) => void;
};
function AccordionItem({
  children,
  title,
  index,
  openIndex,
  handleClick,
}: AccordionItemProp) {
  const isOpen = index === openIndex;

  return (
    <div
      className={`w-full shadow-lg ${isOpen ? "pb-6" : ""}`}
      onClick={() => handleClick(index)}
    >
      <div
        className={twMerge(
          "mb-3 flex items-center justify-between p-4",
          isOpen && "text-goldie-300 bg-black",
        )}
      >
        <span className="capitalize">{title}</span>
        <span className="">
          {isOpen ? <BiChevronDown size={24} /> : <CgChevronRight size={24} />}
        </span>
      </div>
      {isOpen && <>{children}</>}
    </div>
  );
}
