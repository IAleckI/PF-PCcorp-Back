import { gql } from "graphql-tag";

const TypeDefs = gql`

    type Query {
        _: String
    }
    type Mutation {
        _: String
    }

`;

export const RootDefs = [TypeDefs];