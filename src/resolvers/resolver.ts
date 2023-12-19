import { UserProductsResolver } from "./userProductResolver/userProductResolver";
import { ProductResolver } from "./productResolver/ProductResolver";
import userResolver from "./userResolver/userResolver";
import receiptResolver from "./receiptResolver/receiptResolver";
import reviewsResolver from "./reviewsResolver/reviewsResolver";

const Resolvers = {
  Query: {
    _: () => {}
  },
  Mutation: {
    _: () => {}
  }
};

export const RootResolver = [
  Resolvers, ProductResolver, UserProductsResolver, userResolver, receiptResolver, reviewsResolver];