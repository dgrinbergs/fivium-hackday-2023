import { QuestionContext } from "@/lib/context";
import { useContext } from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionBoard() {
  const questions = useContext(QuestionContext);

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
