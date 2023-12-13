import { gql } from "graphql-tag";
import UserProductSchema from "./userProductSchema/userProductSchema";
import ProductSchema from "./productsSchema/productsSchema";

const TypeDefs = gql`

    type Query {
        _: String
    }
    type Mutation {
        _: String
    }

`;

export const RootDefs = [TypeDefs, ProductSchema, UserProductSchema];