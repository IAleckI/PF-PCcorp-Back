import ProductModel from "../model/productModel";
import UserModel from "../model/userModel";
import ReceiptModel from "../model/receiptModel";
import UserProductsModel from "../model/userProductModel";

UserModel.belongsToMany(ProductModel, { 
  through: UserProductsModel,
  foreignKey: "userId",
  otherKey: "productId",
  timestamps: false
});
    
ProductModel.belongsToMany(UserModel, {
  through: UserProductsModel,
  foreignKey: "productId",
  otherKey: "userId",
  timestamps: false
});

// 1-n UserModel - ReceiptModel

UserModel.hasMany(ReceiptModel, {
  foreignKey: "userId",
});

ReceiptModel.belongsTo(ProductModel, {
  foreignKey: "productId"
});
