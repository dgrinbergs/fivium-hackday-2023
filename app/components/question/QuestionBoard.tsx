import { AppContext } from "@/app/context";
import { useContext } from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionBoard() {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state.questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </>
  );
}
