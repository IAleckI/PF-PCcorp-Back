import { Model } from "sequelize";

export interface IReviews extends Model {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  tittle: string;
  comment: string;
}