import { UserProductsResolver } from "./userProductResolver/userProductResolver";
import { ProductResolver } from "./productResolver/ProductResolver";
import userResolver from "./userResolver/userResolver";

const Resolvers = {
  Query: {
    _: () => {}
  },
  Mutation: {
    _: () => {}
  }
};

export const RootResolver = [Resolvers, ProductResolver, UserProductsResolver, userResolver];