import sequelize from "../db";
import { DataTypes } from "sequelize";
import { IUserProductsAttributes } from "../../types/userProducts";


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