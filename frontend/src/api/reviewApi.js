import api from "./axios";


export const getProductReviews = async (productId) => {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data;
};


export const submitReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};
