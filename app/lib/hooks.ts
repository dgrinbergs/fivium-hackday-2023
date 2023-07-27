import { useMutation } from "@apollo/client";
import { Question } from "./graphql/generated/graphql";
import { SUBMIT_QUESTION } from "./graphql/mutations";

interface UseSubmitQuestionProps {
  question: Question["question"];
  ttl: Question["ttl"];
}

export default function useSubmitQuestion({
  question,
  ttl,
}: UseSubmitQuestionProps) {
  const [submitQuestion, { data, loading, error }] = useMutation(
    SUBMIT_QUESTION,
    {
      variables: {
        question,
        ttl,
      },
    }
  );

  if (error) throw error;

  return { loading, data, submitQuestion };
}
