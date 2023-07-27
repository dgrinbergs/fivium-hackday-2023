import { DateTime } from "luxon";
import { createContext } from "react";
import { Question } from "./graphql/generated/graphql";

const QuestionContext = createContext<{
  questions: Array<Question>;
  setQuestions: (a: Array<Question>) => void;
}>({
  questions: [],
  setQuestions: () => {},
});

const DateTimeContext = createContext(DateTime.now());

export { DateTimeContext, QuestionContext };
