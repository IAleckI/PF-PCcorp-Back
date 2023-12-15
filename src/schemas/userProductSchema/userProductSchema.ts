import { gql } from "graphql-tag";

const UserProductSchema = gql`
    type Cart {
        userId: String
        productId: String
        amount: Int
        total: Int
    }

    extend type Query {
        getAllUserProducts(userId: String): [Cart]
    }

    extend type Mutation {
        addUserProduct(userId: String!, id: ID!): Product
        deleteUserProduct(userId: String!, id: ID!): Product
    }
`;

export default UserProductSchema;