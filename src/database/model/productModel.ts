import sequelize from "../db";
import { IProducts } from "../../types/products";
import { DataTypes } from "sequelize";

const ProductModel = sequelize.define<IProducts>("products", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  family: {
    type: DataTypes.STRING(30),
  },
  brand: {
    type: DataTypes.STRING(20),
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
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
});

export default ProductModel;