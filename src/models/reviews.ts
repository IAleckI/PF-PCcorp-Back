import { IReviews } from "../types/reviews";
import ReviewsModel from "../database/model/reviewModel";
import UserModel from "../database/model/userModel";
import { GraphQLError } from "graphql";

export default class Reviews {
  static async getAll (userId: string): Promise<IReviews[]> {
    return await ReviewsModel.findAll({ where: { userId }});
  }

  static async getOne (userId: string, reviewId: string): Promise<IReviews | null> {
    return await ReviewsModel.findOne({ where: { userId, id: reviewId }});
  }

  static async create (userId: string, review: IReviews): Promise<IReviews> {
    const user = await UserModel.findByPk(userId);

    if (user?.verify === false) throw new GraphQLError("User not verified", { 
      extensions: { code: "UNAUTHENTICATED" }});

    return await ReviewsModel.create({ ...review, userId });
  }

  static async update (userId: string, review: IReviews): Promise<IReviews | undefined> {
    const reviewUpdate = await ReviewsModel.findOne({ where: { userId, id: review.id }});
    reviewUpdate?.set(review);
    return await reviewUpdate?.save();
  }

  static async delete (reviewId: string): Promise<IReviews | null> {
    const review = await ReviewsModel.findByPk(reviewId);

    await ReviewsModel.destroy({
      where: {
        id: reviewId
      }
    });

    return review;
  }
}