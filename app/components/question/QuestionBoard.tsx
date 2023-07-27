import { QuestionContext } from "@/lib/context";
import { Question } from "@/lib/graphql/generated/graphql";
import { useContext, useEffect } from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionBoard() {
  const { questions, setQuestions } = useContext(QuestionContext);

  useEffect(() => {
    const source = new EventSource("http://192.168.100.91:8080/events");
    source.onmessage = onNewQuestion;
    return () => source.close();
  }, []);

  function onNewQuestion({ isTrusted, data }: MessageEvent) {
    if (!isTrusted) return;
    const question: Question = JSON.parse(data);
    setQuestions([question, ...questions]);
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </>
  );
}
