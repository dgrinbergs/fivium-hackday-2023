import { Question } from "@/lib/graphql/generated/graphql";
import { QuestionActions, Types, questionReducer } from "@/lib/reducers";
import React, { Dispatch, createContext, useEffect, useReducer } from "react";

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
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_EVENTS_URL;
    if (!url) {
      throw new Error("Missing NEXT_PUBLIC_EVENTS_URL environment variable");
    }
    const source = new EventSource(url);
    source.onmessage = onNewQuestion;

    return () => source.close();
  }, []);

  function onNewQuestion({ isTrusted, data }: MessageEvent) {
    if (!isTrusted) return;
    dispatch({ type: Types.Add, payload: { question: JSON.parse(data) } });
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
