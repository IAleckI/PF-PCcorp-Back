import ProductModel from "../model/productModel";
import UserModel from "../model/userModel";
import ReceiptModel from "../model/receiptModel";
import UserProductsModel from "../model/userProductModel";
import ReviewsModel from "../model/reviewModel";

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

UserModel.hasMany(ReviewsModel, {
  foreignKey: "userId",
  sourceKey: "email"
});

ReviewsModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "email"
});

// 1-n ProductModel - ReviewsModel

ProductModel.hasMany(ReviewsModel, {
  foreignKey: "productId",
  sourceKey: "id"
});

ReviewsModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  targetKey: "id"
});