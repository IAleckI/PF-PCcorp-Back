import { Model } from "sequelize";
import ProductModel from "../database/model/productModel";
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
    addCart: BelongsToManyAddAssociationMixin<ProductModel, "products">;
    getCart: BelongsToManyGetAssociationsMixin<ProductModel>;
    removeCart: BelongsToManyRemoveAssociationMixin<ProductModel, "products">;
}

export interface IUserModel extends Model<IUser>, IUser {}