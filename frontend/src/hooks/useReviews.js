import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductReviews, submitReview } from "../api/reviewApi";


export const useProductReviews = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};


export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewData) => submitReview(reviewData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["reviews", variables.productId]);
    },
  });
};
