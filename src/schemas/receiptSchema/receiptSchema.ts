import { gql } from "graphql-tag";

const receiptSchema = gql`
    type Receipt {
        id: ID
        userId: String
        User: User
        Product: Product
    }

    extend type Query {
        getAllReceipts(id: String!): [Receipt]
        getReceiptById(id: String!, productId: String!): Receipt
    }

    extend type Mutation {
        createReceipt(userId: String, productId: String): Receipt
    }
`;

export default receiptSchema;