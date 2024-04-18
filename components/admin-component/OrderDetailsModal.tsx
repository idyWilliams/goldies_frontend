import React from "react";

export default function OrderDetailsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <section
      className={`${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="h-[300px] w-[500px] rounded-md bg-white p-4">
        <button className="rounded-md bg-main px-6 py-2" onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </section>
  );
}
