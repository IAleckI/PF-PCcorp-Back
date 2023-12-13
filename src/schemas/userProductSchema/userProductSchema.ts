import { gql } from "graphql-tag";

const UserProductSchema = gql`
    extend type Query {
        getAllUserProducts(userId: String): [Product]
        getUserProduct(userId: String, id: ID!): Product
    }

    extend type Mutation {
        addUserProduct(userId: String!, id: ID!): Product
        deleteUserProduct(userId: String!, id: ID!): Product
    }
`;

export default UserProductSchema;