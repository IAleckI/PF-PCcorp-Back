import { Model } from "sequelize";

export interface IFav extends Model {
    userId: string;
    productId: string;
}