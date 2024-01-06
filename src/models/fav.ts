import UserModel from "../database/model/userModel";
import ProductModel from "../database/model/productModel";
import FavModel from "../database/model/favsModel";
import { GraphQLError } from "graphql";

export default class Fav {
  static async getFavs (userId: string) {
    const favs = await FavModel.findAll({ where: { userId }, include: [{
      model: ProductModel,
      required: true
    }]});

    const products = [];

    for (const item of favs ) {
      products.push(item.dataValues.product.dataValues);
    }

    return products;
  }

  static async createFav (userId: string, productId: string) {
    const user = await UserModel.findByPk(userId);
    const product = await ProductModel.findByPk(productId);
    const fav = await FavModel.findOne({ where: { userId, productId }});
    if ( !user || !product) throw new GraphQLError("User or product not found");
    if (fav) throw new GraphQLError("Fav already exists");

    await FavModel.create({ userId, productId });

    return product;

  }

  static async deleteFav (userId: string, productId: string) {
    const product = await ProductModel.findByPk(productId);
    if (!product) throw new GraphQLError("Product not found");

    const fav = await FavModel.findOne({ where: { userId, productId }});
    if (!fav) throw new GraphQLError("Fav not found");

    await fav.destroy();

    return product;

  }
}