import sequelize from "../db";
import { DataTypes } from "sequelize";
import { IUpload } from "../../types/upload";

const UploadModel = sequelize.define<IUpload>("upload", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default UploadModel;