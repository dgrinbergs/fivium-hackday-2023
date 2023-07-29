import { Question } from "@/lib/graphql/generated/graphql";
import { QuestionActions, questionReducer } from "@/lib/reducers";
import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { EventProvider } from "./events";

type InitialStateType = {
  questions: Array<Question>;
};

const initialState: InitialStateType = {
  questions: [],
};

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<QuestionActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

function mainReducer({ questions }: InitialStateType, action: QuestionActions) {
  return {
    questions: questionReducer(questions, action),
  };
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <EventProvider>{children}</EventProvider>
    </AppContext.Provider>
  );
}
