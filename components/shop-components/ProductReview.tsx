import StarRating from "../StarRating";
import RatingRange from "./RatingRange";

const ProductReview = ({ setShowReviews }: { setShowReviews: any }) => {
  return (
    <>
      <div className="mt-5">
        <h3 className="mb-2 font-semibold">Ratings and Reviews</h3>
        <div className="grid grid-cols-2 items-center gap-3">
          <div className="flex flex-col gap-1 rounded-md bg-neutral-800 p-4 text-goldie-300">
            <span>4.5/5.0</span>
            <StarRating
              canRate={false}
              iconSize={24}
              iconColor={"text-goldie-300"}
            />
            <span className="text-sm">32 verified ratings</span>
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 5 }, (_: any, i: number) => (
              <RatingRange key={i} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 mt-2 font-semibold">
            Verified Comments from customers
          </h3>
          <div className="mt-3 rounded-md bg-neutral-100 p-4">
            <div className="flex items-center justify-between">
              <StarRating
                canRate={false}
                iconSize={20}
                iconColor={"text-goldie-300"}
              />
              <span>18/06/2024</span>
            </div>
            <p className="my-3">I got exactly what i ordered</p>
            <span className="text-sm">by Jerry James</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => setShowReviews(false)}
            className="bg-neutral-800 px-5 py-2 text-goldie-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
