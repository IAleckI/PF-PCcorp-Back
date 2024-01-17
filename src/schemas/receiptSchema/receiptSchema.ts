import { gql } from "graphql-tag";

const receiptSchema = gql`
    type Receipt {
        id: ID
        userId: String
        User: User
        Product: Product
    }

    extend type Query {
        getAllReceipts(id: String!): [Product]
        getReceiptById(id: String!, productId: String!): Receipt
    }

    extend type Mutation {
        createReceipt(id: ID, userId: String, productId: ID): Receipt
    }
`;

export default receiptSchema;