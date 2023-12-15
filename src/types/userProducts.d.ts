import { Model } from "sequelize";

export interface IUserProductsAttributes extends Model{
    userId: string;
    productId: string;
    amount: number;
    total: number
  }