import { gql } from "graphql-tag";
import UserProductSchema from "./userProductSchema/userProductSchema";
import ProductSchema from "./productsSchema/productsSchema";
import UserSchema from "./userSchema/userSchema";

const TypeDefs = gql`

    type Query {
        _: String
    }
    type Mutation {
        _: String
    }

`;

export const RootDefs = [TypeDefs, ProductSchema, UserProductSchema, UserSchema];