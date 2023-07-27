export interface ApplicationEvent {}

export interface QuestionEvent extends ApplicationEvent {
  id: String;
  postedTimestamp: Date;
  ttl: Number;
  question: String;
}
