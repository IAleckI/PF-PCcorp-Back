import { gql } from "graphql-tag";
import UserProductSchema from "./userProductSchema/userProductSchema";
import ProductSchema from "./productsSchema/productsSchema";
import UserSchema from "./userSchema/userSchema";
import receiptSchema from "./receiptSchema/receiptSchema";
import ReviewSchema from "./reviewSchema/reviewSchema";
import favSchema from "./favSchema/favSchema";
import paymentSchema from "./paymentSchema/paymentSchema";

const TypeDefs = gql`

    type Query {
        _: String
    }
    type Mutation {
        _: String
    }

`;

export const RootDefs = [
  TypeDefs, ProductSchema, UserProductSchema, UserSchema, receiptSchema, ReviewSchema, favSchema, paymentSchema];