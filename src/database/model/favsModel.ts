import sequelize from "../db";
import { IFav } from "../../types/favs";
import { DataTypes } from "sequelize";

const FavModel = sequelize.define<IFav>("fav", {
  userId: {
    type: DataTypes.STRING
  },
  productId: {
    type: DataTypes.UUID
  }
});

export default FavModel;