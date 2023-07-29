import { sortBy } from "lodash";
import { DateTime } from "luxon";
import { Question } from "./graphql/generated/graphql";

// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Add = "ADD_QUESTION",
  Remove = "DELETE_PRODUCT",
}

// Question

type QuestionPayload = {
  [Types.Add]: {
    question: Question;
  };
  [Types.Remove]: {
    id: Question["id"];
  };
};

export type QuestionActions =
  ActionMap<QuestionPayload>[keyof ActionMap<QuestionPayload>];

export const questionReducer = (
  questions: Array<Question>,
  action: QuestionActions
) => {
  switch (action.type) {
    case Types.Add:
      return orderQuestions([...questions, action.payload.question]);
    case Types.Remove:
      return [...questions.filter(({ id }) => action.payload.id !== id)];
    default:
      return questions;
  }
};

function orderQuestions(questions: Array<Question>): Array<Question> {
  return sortBy(questions, ({ postedTimestamp, ttl }) =>
    DateTime.fromISO(postedTimestamp).plus({ seconds: ttl }).toMillis()
  );
}
