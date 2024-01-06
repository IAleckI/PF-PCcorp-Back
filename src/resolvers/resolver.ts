import { UserProductsResolver } from "./userProductResolver/userProductResolver";
import { ProductResolver } from "./productResolver/ProductResolver";
import userResolver from "./userResolver/userResolver";
import receiptResolver from "./receiptResolver/receiptResolver";
import reviewsResolver from "./reviewsResolver/reviewsResolver";
import favResolver from "./favResolver/favResolver";
import paymentResolver from "./paymentResolver/paymentResolver";

const Resolvers = {
  Query: {
    _: () => {}
  },
  Mutation: {
    _: () => {}
  }
};

export const RootResolver = [
  Resolvers, ProductResolver, UserProductsResolver, 
  userResolver, receiptResolver, reviewsResolver, 
  favResolver, paymentResolver
];