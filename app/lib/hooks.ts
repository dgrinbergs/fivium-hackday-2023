import { useMutation } from "@apollo/client";
import { Question } from "./graphql/generated/graphql";
import { SUBMIT_QUESTION } from "./graphql/mutations";

interface UseSubmitQuestionProps {
  question: Question["question"];
  ttl: Question["ttl"];
}

export default function useSubmitQuestion({
  question,
  ttl,
}: UseSubmitQuestionProps) {
  const [submitQuestion, { data, loading, error }] = useMutation(
    SUBMIT_QUESTION,
    {
      variables: {
        question,
        ttl,
      },
    }
  );

  if (error) throw error;

  return { loading, data, submitQuestion };
}

// export function useCountdown(seconds: number) {
//   const [countdown, setCountdown] = useState(seconds);

//   useEffect(() => {
//     tick();
//     const interval = setInterval(tick, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const done = () => {};

//   function tick() {
//     if (seconds === 0) {
//       done();
//       return;
//     }
//     setCountdown((s) => s - 1);
//   }

//   return { countdown, done };
// }
