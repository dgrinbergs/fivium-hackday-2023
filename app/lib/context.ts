import { DateTime } from "luxon";
import { createContext } from "react";
import { Question } from "./graphql/generated/graphql";

const QuestionContext = createContext<Array<Question>>([]);

const DateTimeContext = createContext(DateTime.now());

export { DateTimeContext, QuestionContext };
