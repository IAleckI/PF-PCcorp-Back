import { gql } from 'graphql-tag';

const receiptSchema = gql`
    type Receipt {
        id: ID!
        userId: String
        productId: String
        user: User
        product: Product
    }

    extend type Query {
        getAllReceipts: [Receipt]
        getReceiptById(id: ID!): Receipt
    }

    extend type Mutation {
        createReceipt(userId: String, productId: String): Receipt
        updateReceipt(id: ID!, userId: String, productId: String): Receipt
        deleteReceipt(id: ID!): Boolean
    }
`;

export default receiptSchema;