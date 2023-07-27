import { QuestionContext } from "@/lib/context";
import { useContext } from "react";
import NewQuestionForm from "./question/NewQuestionForm";

export default function Header() {
  const { questions } = useContext(QuestionContext);

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center pb-4">
      <h1 className="text-2xl font-medium">{`${questions.length} ${
        questions.length == 1 ? "Question" : "Questions"
      }`}</h1>
      <NewQuestionForm />
    </header>
  );
}
