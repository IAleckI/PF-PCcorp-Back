import { Model } from "sequelize";

export interface IReceipt extends Model {
    id: string
    userId: string;
    productId: string;
}