import { useAuth } from "@/context/AuthProvider";
import { IProduct } from "@/interfaces/product.interface";
import {
  IReview,
  UpdateReviewDTO
} from "@/interfaces/review.interface";
import {
  createProductReview,
  deleteProductReview,
  getAllProductReviews,
  likeReview,
  updateProductReview,
} from "@/services/hooks/products";
import { ErrorResponse } from "@/types/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Like1 } from "iconsax-react";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import StarRating from "../StarRating";
import { Button } from "../ui/button";
import RatingRange from "./RatingRange";
import ReviewSkeleton from "./reviews/ReviewSkeleton";

const reviewSchema = yup.object().shape({
  rating: yup.number().required("Rating is required"),
  comment: yup.string().required("Comment is required"),
});

const ProductReview = ({ product }: { product: IProduct }) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const pathname = usePathname();

  const redirectUrl = encodeURIComponent(pathname);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  // Fetch reviews
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", product?._id],
    queryFn: () => getAllProductReviews(product?._id),
  });

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
    }
  }, [data]);

  // Create review mutation
  const createReviewMutation = useMutation({
    mutationFn: createProductReview,
    onSuccess: () => {
      toast.success("Review created successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", product?._id] });
      queryClient.invalidateQueries({
        queryKey: ["getProductBySlug", product?.slug],
      });
      reset();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create review";
      toast.error(`Error: ${errorMessage}`);
    },
  });

  // Update review mutation
  const updateReviewMutation = useMutation({
    mutationFn: (data: UpdateReviewDTO) => updateProductReview(data, reviewId!),
    onSuccess: () => {
      toast.success("Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", product?._id] });
      queryClient.invalidateQueries({
        queryKey: ["getProductBySlug", product?.slug],
      });
      reset();
      setReviewId(null);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update review";
      toast.error(`Error: ${errorMessage}`);
    },
  });

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: deleteProductReview,
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", product?._id] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete review";
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const likeReviewMutation = useMutation({
    mutationFn: likeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", product?._id] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to like review";
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleSubmitReview = handleSubmit((data) => {
    if (reviewId) {
      // Update existing review
      updateReviewMutation.mutate(data);
    } else {
      // Create new review
      createReviewMutation.mutate({ ...data, productId: product._id });
    }
  });

  const handleEditReview = (review: any) => {
    setReviewId(review._id);
    setValue("rating", review.rating);
    setValue("comment", review.comment);
  };

  const handleDeleteReview = (reviewId: string) => {
    deleteReviewMutation.mutate(reviewId);
  };

  const handleLikeReview = (reviewId: string) => {
    likeReviewMutation.mutate(reviewId);
  };

  if (isLoading) {
    return (
      <div className="mt-5">
        <h3 className="mb-2 font-semibold">Ratings and Reviews</h3>
        <div className="grid grid-cols-2 items-center gap-3">
          <div className="flex flex-col gap-1 rounded-md bg-brand-200 p-4 text-brand-100">
            <span>4.5/5.0</span>
            <StarRating
              canRate={false}
              iconSize={24}
              iconColor={"text-brand-200"}
            />
            <span className="text-sm">32 verified ratings</span>
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 5 }, (_: any, i: number) => (
              <div
                key={i}
                className="h-3 w-full overflow-hidden rounded-full bg-neutral-100"
              >
                <div className="h-3 rounded-full bg-goldie-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 mt-2 font-semibold">
            Verified Comments from customers
          </h3>
          {Array.from({ length: 3 }).map((_, index) => (
            <ReviewSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load reviews. Please try again.</div>;
  }

  return (
    <div className="mt-5">
      <h3 className="mb-2 font-semibold">Ratings and Reviews</h3>
      <div className="grid grid-cols-2 items-center gap-3">
        <div className="flex flex-col gap-1 rounded-md bg-brand-200 p-4 text-brand-100">
          <span>{product?.averageRating.toFixed(1)}/5.0</span>
          <StarRating
            canRate={false}
            iconSize={24}
            iconColor={"text-brand-200"}
            defaultRating={product?.averageRating}
          />
          <span className="text-sm ">
            {product?.ratingsCount?.total} verified ratings
          </span>
        </div>
        <div className="grid gap-2">
          {[5, 4, 3, 2, 1].map((starValue) => (
            <RatingRange
              key={starValue}
              ratings={
                product?.ratingsCount || {
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                  total: 0,
                }
              }
              starValue={starValue}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 mt-2 font-semibold">
          Verified Comments from customers
        </h3>
        {!reviews ? (
          <p className="italic">No reviews yet.</p>
        ) : (
          reviews?.map((review) => (
            <div
              key={review._id}
              className="mt-3 rounded-md bg-neutral-100 p-4"
            >
              <div className="flex items-center justify-between">
                <StarRating
                  canRate={false}
                  iconSize={20}
                  iconColor={"text-brand-200"}
                  defaultRating={review.rating}
                />
                <span className="text-sm">
                  {moment(review.createdAt).format("MMM DD, YYYY")}
                </span>
              </div>
              <p className="my-3">{review.comment}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  by{" "}
                  {review.user?.firstName + " " + review?.user?.lastName ||
                    "Anonymous"}
                </span>
                <button
                  onClick={() => handleLikeReview(review._id)}
                  className="flex items-center gap-1 text-sm"
                  disabled={likeReviewMutation.isPending}
                >
                  <Like1 size={16} />
                  {review.likes.length || 0}
                </button>
              </div>

              {/* Conditionally render Edit and Delete buttons */}
              {auth?.user && auth?.user._id === review.user?._id && (
                <div className="mt-2 flex gap-2">
                  <Button size={"sm"} onClick={() => handleEditReview(review)}>
                    Edit
                  </Button>
                  <Button
                    size={"sm"}
                    onClick={() => handleDeleteReview(review._id)}
                    disabled={deleteReviewMutation.isPending}
                  >
                    {deleteReviewMutation.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Conditionally render the review form */}
      {auth?.user ? (
        <div className="mt-5">
          <h3 className="mb-2 font-semibold">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="flex flex-col gap-3">
            <div>
              <StarRating
                {...register("rating")}
                canRate={true}
                iconSize={24}
                iconColor={"text-brand-200"}
                onSetRating={(rate) => setValue("rating", rate)}
                defaultRating={reviewId ? getValues("rating") : 0}
              />
              {errors.rating && (
                <p className="text-sm text-red-500">{errors.rating.message}</p>
              )}
            </div>
            <div>
              <textarea
                {...register("comment")}
                placeholder="Write your review..."
                className="h-24 w-full rounded-md border p-2"
              />
              {errors.comment && (
                <p className="text-sm text-red-500">{errors.comment.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-brand-200 text-brand-100 hover:bg-brand-200"
              disabled={
                createReviewMutation.isPending || updateReviewMutation.isPending
              }
            >
              {createReviewMutation.isPending ||
              updateReviewMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : reviewId ? (
                "Update Review"
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="mt-5 flex justify-center py-8">
          <p className="text-base text-neutral-800">
            Please{" "}
            <a
              href={`/sign-in?redirect_url=${redirectUrl}`}
              className="text-brand-200 hover:underline"
            >
              log in
            </a>{" "}
            to leave a review.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductReview;
