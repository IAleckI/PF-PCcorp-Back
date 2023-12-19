import { GraphQLError } from "graphql";
import Reviews from "../models/reviews";
import { IReviews } from "../types/reviews";

export default class ReviewsController {
  static async getAllUserReviews (userId: string): Promise<IReviews[]> {
    try {
      if (!userId) throw new GraphQLError("User id is required",{ 
        extensions: { code: "BAD_USER_INPUT" } });
        
      const reviews = await Reviews.getAll(userId);

      if (reviews.length === 0) throw new GraphQLError("User has no reviews", { 
        extensions: { code: "BAD_USER_INPUT" } });

      return reviews;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code } });
    }
  }

  static async getOneUserReview (userId: string, reviewId: string): Promise<IReviews> {
    try {
      if (!userId || !reviewId) throw new GraphQLError("User id and review id are required",{ 
        extensions: { code: "BAD_USER_INPUT" } });

      const review = await Reviews.getOne(userId, reviewId);

      if (review === null) throw new GraphQLError("Review not found", { 
        extensions: { code: "BAD_USER_INPUT" } });

      return review;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

  static async createReview (userId: string, review: IReviews): Promise<IReviews> {
    try {
      if (!userId) throw new GraphQLError("User id and review are required",{ 
        extensions: { code: "BAD_USER_INPUT" } });

      return await Reviews.create(userId, review);
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

  static async updateReview (userId: string, review: IReviews): Promise<IReviews> {
    try {
      if (!userId) throw new GraphQLError("User id and review are required",{ 
        extensions: { code: "BAD_USER_INPUT" } });

      if (!review) throw new GraphQLError("User id and review are required",{ 
        extensions: { code: "BAD_USER_INPUT" } });

      const reviews = await Reviews.update(userId, review);
      
      if (!reviews) throw new GraphQLError("Review not found", { 
        extensions: { code: "BAD_USER_INPUT" } });

      return reviews;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  
  }

  static async deleteReview (userId: string, reviewId: string): Promise<IReviews> {
    try {
      if (!userId || reviewId) throw new GraphQLError("User id and review are required",{
        extensions: { code: "BAD_USER_INPUT" }
        
      });

      const review = await Reviews.delete(reviewId);
      if (review === null) throw new GraphQLError("Review not found", { 
        extensions: { code: "BAD_USER_INPUT" } });

      return review;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code  }
      });
    }
  }
}