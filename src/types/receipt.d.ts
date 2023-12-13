import { Model } from "sequelize";

export interface IReceipt extends Model {
    userId: string;
    productId: string;
}