"use client";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

type AccordionProp = {
  arr: any[];
};
export default function Accordion({ arr }: AccordionProp) {
  return (
    <div className="mt-4 space-y-3">
      {arr.map((item: any, i: number) => (
        <AccordionItem title={item.title} key={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
type AccordionItemProp = {
  children: React.ReactNode;
  title: string;
};
function AccordionItem({ children, title }: AccordionItemProp) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div
      className={`w-full shadow-lg ${isOpen ? "pb-6" : ""}`}
      onClick={handleToggle}
    >
      <div
        className={twMerge(
          "mb-3 flex items-center justify-between p-4",
          isOpen && "bg-black text-main",
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
