import { gql } from "graphql-tag";

const ProductSchema = gql`
    type Product {
      id: String
      name: String
      model: String
      family: String
      brand: String
      price: Int
      stock: Int
      image: String
      amount: Int
      total: Int
      userId: String
    }

    extend type Query {
        getAllProducts: [Product]
        getProductById(id: ID!): Product
    }

    extend type Mutation {
        createProduct(
            name: String!
            model: String!
            family: String!
            brand: String!
            stock: Int!
            price: Int!
            image:String!
        ): Product
        updateProduct(
            id: ID!
            name: String
            model: String
            family: String
            brand: String
            stock: Int
            price: Int
        ): Product
        deleteProduct(id: ID!): Product
    }
`;

export default ProductSchema;