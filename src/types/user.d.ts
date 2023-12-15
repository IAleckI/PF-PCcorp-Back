import { Model } from "sequelize";
import ProductModel from "../database/model/productModel";
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from "sequelize";

export interface IUserModel extends Model{
    id?: string
    userName: string
    email: string
    passwordHash: string
    token?: string
    role: string
    verify?: boolean
    addProduct: BelongsToManyAddAssociationMixin<ProductModel, "products">;
    getProduct: BelongsToManyGetAssociationsMixin<ProductModel>;
    removeProduct: BelongsToManyRemoveAssociationMixin<ProductModel, "products">;
}
