import ReviewsController from "../../controllers/reviewsController";
import { IReviews } from "../../types/reviews";

const reviewsResolver = {
  Query: {
    getUserReviews: async (_: IReviews, args: IReviews) => 
      await ReviewsController.getAllUserReviews(args.userId),
    getSingleReview: async (_: IReviews, args: IReviews) =>
      await ReviewsController.getOneUserReview(args.userId, args.productId),
  },
  Mutation: {
    createUserReview: async (_: IReviews, args: IReviews) =>
      await ReviewsController.createReview(args.userId, args),
    updateUserReview: async (_: IReviews, args: IReviews) =>
      await ReviewsController.updateReview(args.userId, args),
    deleteUserReview: async (_: IReviews, args: IReviews) =>
      await ReviewsController.deleteReview(args.userId, args.id)
  }
};

export default reviewsResolver;