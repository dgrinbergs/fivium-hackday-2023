import { graphql } from "./generated";

export const SUBMIT_QUESTION = graphql(/* GraphQL */ `
  mutation submitQuestion($question: String!, $ttl: Int!) {
    submitQuestion(question: $question, ttl: $ttl) {
      id
      postedTimestamp
      ttl
      question
    }
  }
`);
