import sequelize from "../db";
import { DataTypes, Model } from "sequelize";

export interface IUserProductsAttributes extends Model{
  userId: string;
  productId: string;
  amount: number;
  total: number
}

const UserProductsModel = sequelize.define<IUserProductsAttributes>("user_products", {
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  total: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

export default UserProductsModel;