import { Button } from "../ui/button";

const ProductError = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center py-12 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        Oops! Something went wrong.
      </h2>
      <p className="mt-2 text-neutral-600">
        We couldn&apos;t load the product details. Please try again.
      </p>
      <Button
        onClick={refetch}
        className="mt-4 bg-neutral-900 text-white hover:bg-neutral-800"
      >
        Retry
      </Button>
    </div>
  );
};

export default ProductError;
