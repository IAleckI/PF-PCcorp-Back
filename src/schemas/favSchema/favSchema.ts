import { gql } from "graphql-tag";

const favSchema = gql`

    extend type Query {
        getAllFavs(userId: String!): [Product]
    }

    extend type Mutation {
        addFav(userId: String!, productId: ID!): Product
        deleteFav(userId: String!, productId: ID!): Product
    }

`;

export default favSchema;