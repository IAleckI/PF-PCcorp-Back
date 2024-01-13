import ProductModel from "../model/productModel";
import UserModel from "../model/userModel";
import ReceiptModel from "../model/receiptModel";
import UserProductsModel from "../model/userProductModel";
import ReviewsModel from "../model/reviewModel";
import FavModel from "../model/favsModel";

// n-n UserModel - ProductModel

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

// n-n UserModel - ProductModel - product


UserModel.hasMany(FavModel, {
  foreignKey: "userId",
  sourceKey: "email"
});

FavModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "email"
});


ProductModel.hasMany(FavModel, {
  foreignKey: "productId",
  sourceKey: "id"
});

FavModel.belongsTo(ProductModel, {
  foreignKey: "productId",
  targetKey: "id"
});


// 1-n UserModel - ReceiptModel

UserModel.hasMany(ReceiptModel, {
  foreignKey: "userId",
  sourceKey: "email"
});

ReceiptModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "email"
});

// 1-n UserModel - ReviewsModel

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