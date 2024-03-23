import React from "react";

type MenuProps = {
  children: React.ReactNode;
  className: string;
};
export default function MenuPopup({ children, className }: MenuProps) {
  return <div className={className}>{children}</div>;
}
