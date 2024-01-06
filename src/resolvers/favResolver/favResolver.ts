import { IFav } from "../../types/favs";
import FavController from "../../controllers/favController";

const favResolver = {
  Query: {
    getAllFavs: async (_root: IFav, args: IFav) =>
      await FavController.getAllFavs(args.userId),
  },
  Mutation: {
    addFav: async (_root: IFav, args: IFav) => 
      await FavController.createFav(args.userId, args.productId),
    deleteFav: async (_root: IFav, args: IFav) =>
      await FavController.deleteFav(args.userId, args.productId),
  }
};

export default favResolver;