import sequelize from "../db";
import { IReviews } from "../../types/reviews";
import { DataTypes } from "sequelize";

const ReviewsModel = sequelize.define<IReviews>("reviews", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  rating: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  tittle: {
    type: DataTypes.STRING
  },
  comment: {
    type: DataTypes.STRING,
  }
});

export default ReviewsModel;