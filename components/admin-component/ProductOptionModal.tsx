import { useRouter } from "next/navigation";
import React from "react";

export default function ProductOptionModal({
  action,
  product,
  setShowModal,
}: {
  action: string;
  product: any;
  setShowModal: any;
}) {
  const router = useRouter();
  const handleConfirm = () => {
    if (action.toLowerCase() === "edit") {
      router.push(`/admin/create-products?edit=${product.id}`);
    }
  };
  return (
    <section className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-[300px] rounded-md bg-white p-6">
        <h3>
          Are you sure you want to {action}{" "}
          <span className="capitalize">{product.productName}</span>?
        </h3>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="rounded bg-green-600 px-4 py-2 text-sm text-white"
            onClick={handleConfirm}
          >
            Yes
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 text-sm text-white"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}
