import { gql } from "graphql-tag";

const ReviewSchema = gql`
    type Review {
      id: String
      userId: String
      productId: String
      rating: Int
      tittle: String
      comment: String
    }

    extend type Query {
        getUserReviews(userId: String!): Review
        getSingleReview(userId: String!, productId: String!): Review
    }
    extend type Mutation {
        createUserReview(
            userId: String!,
            productId: String!,
            rating: Int,
            tittle: String,
            comment: String): Review
        updateUserReview(
            userId: String!,
            productId: String!,
            rating: Int,
            tittle: String,
            comment: String): Review
        deleteUserReview(userId: String!, id: String!): Review
    }
`;

export default ReviewSchema;