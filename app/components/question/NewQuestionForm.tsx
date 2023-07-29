import useSubmitQuestion from "@/lib/hooks";
import { FormEvent, useState } from "react";

export default function NewQuestionForm() {
  const [question, setQuestion] = useState("");
  const [ttl] = useState(30);

  const { submitQuestion, loading } = useSubmitQuestion({ question, ttl });

  async function submit(event: FormEvent) {
    event.preventDefault();
    await submitQuestion();
    setQuestion("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-row justify-center items-center space-x-4"
    >
      <input
        type="text"
        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder="What's your question?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required={true}
      />
      <button
        className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white grow-0"
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
}
