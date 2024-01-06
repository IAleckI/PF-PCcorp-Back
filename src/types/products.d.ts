import { Model } from "sequelize";
import UserModel from "../database/model/userModel";
import FavModel from "../database/model/favsModel";
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from "sequelize";

export interface IProducts extends Model {
  id: string;
  name: string;
  model: string;
  image: string;
  family: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  disabled: boolean;
  type: string;
  userId?: string;
  amount?: number;
  addCart: BelongsToManyAddAssociationMixin<UserModel, "users">;
  getCart: BelongsToManyGetAssociationsMixin<UserModel>;
  removeCart: BelongsToManyRemoveAssociationMixin<UserModel, "users">;
}