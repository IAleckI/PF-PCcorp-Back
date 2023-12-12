import ProductModel from "../model/productModel";
import UserModel from "../model/userModel";
import ReceiptModel from "../model/receiptModel";
import "../model/uploadModel";

UserModel.belongsToMany(ProductModel, { 
  through: "cart_product",
  foreignKey: "productId",
  otherKey: "userId",
  timestamps: false
});
    
ProductModel.belongsToMany(UserModel, {
  through: "cart_product",
  foreignKey: "userId",
  otherKey: "productId",
  timestamps: false
});

// 1-n UserModel - ReceiptModel

UserModel.hasMany(ReceiptModel, {
  foreignKey: "userId",
});

ReceiptModel.belongsTo(ProductModel, {
  foreignKey: "productId"
});
