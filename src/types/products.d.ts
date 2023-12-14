import { Model } from "sequelize";
import UserModel from "../database/model/userModel";
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from "sequelize";

export interface IProducts extends Model {
  id: string;
  name: string;
  model: string;
  family: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  userId?: string;
  addCart: BelongsToManyAddAssociationMixin<UserModel, "users">;
  getCart: BelongsToManyGetAssociationsMixin<UserModel>;
  removeCart: BelongsToManyRemoveAssociationMixin<UserModel, "users">;
}