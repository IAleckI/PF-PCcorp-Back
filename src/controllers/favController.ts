import { GraphQLError } from "graphql";
import Fav from "../models/fav";

export default class FavController {

  static async getAllFavs (userId: string) {
    try {
      if (!userId) throw new GraphQLError("Missing required fields", {
        extensions: { code: "BAD_USER_INPUT" },
      });

      const favs = await Fav.getFavs(userId);

      return favs;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async createFav(userId: string, productId: string) {
    try {
      if (!userId || !productId) throw new GraphQLError("Missing required fields", {
        extensions: { code: "BAD_USER_INPUT" },
      });
      const product = await Fav.createFav(userId, productId);
      
      return product;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }

  static async deleteFav(userId: string, productId: string) {
    try {
      if (!userId || !productId) throw new GraphQLError("Missing required fields", {
        extensions: { code: "BAD_USER_INPUT" },
      });
      const product = await Fav.deleteFav(userId, productId);
      return product;
    } catch (error: any) {
      throw new GraphQLError(error.message);
    }
  }
}