import { UserProductsResolver } from "./userProductResolver/userProductResolver";
import { ProductResolver } from "./productResolver/ProductResolver";

const Resolvers = {
  Query: {
    _: () => {}
  },
  Mutation: {
    _: () => {}
  }
};

export const RootResolver = [Resolvers, ProductResolver, UserProductsResolver];