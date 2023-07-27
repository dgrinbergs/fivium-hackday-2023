import { Question } from "@/lib/graphql/generated/graphql";
import { useState } from "react";

export default function QuestionCard({ question }: Question) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`${
        isExpanded ? "absolute w-full h-full bg-white" : "w-full h-full"
      } transition-transform border rounded-md p-4`}
    >
      <p className="text-lg font-medium">{question}</p>
    </div>
  );
}
