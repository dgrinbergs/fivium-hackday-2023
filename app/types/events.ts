import { Question } from "@/lib/graphql/generated/graphql";
import { QuestionActions, Types } from "@/lib/reducers";
import { Dispatch } from "react";

export interface ApplicationEvent {}

export interface QuestionEvent extends ApplicationEvent {
  id: String;
  postedTimestamp: Date;
  ttl: Number;
  question: String;
}

enum EventTypes {
  QuestionPosted = "QUESTION_POSTED",
}

type EventPayload = {
  [EventTypes.QuestionPosted]: {
    id: Question["id"];
    postedTimestamp: Question["postedTimestamp"];
    ttl: Question["ttl"];
    question: Question["question"];
  };
};

export function handleEvent(
  dispatch: Dispatch<QuestionActions>,
  { isTrusted, data }: MessageEvent
) {
  console.log("handleEvent");
  if (!isTrusted) return;
  dispatch({ type: Types.Add, payload: { question: JSON.parse(data) } });
}
