import sequelize from "../db";
import { IProducts } from "../../types/products";
import { DataTypes } from "sequelize";

const ProductModel = sequelize.define<IProducts>("products", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  family: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

export default ProductModel;