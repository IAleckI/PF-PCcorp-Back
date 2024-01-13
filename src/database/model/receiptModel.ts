import sequelize from "../db";
import { DataTypes  } from "sequelize";
import { IReceipt } from "../../types/receipt";

const ReceiptModel = sequelize.define<IReceipt>("receipt", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default ReceiptModel;