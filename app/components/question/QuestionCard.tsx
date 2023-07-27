import { Question } from "@/lib/graphql/generated/graphql";

export default function QuestionCard({ question }: Question) {
  return (
    <div className="w-full h-full border rounded-md p-4">
      <p className="text-lg font-medium">{question}</p>
    </div>
  );
}
