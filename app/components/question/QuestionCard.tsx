import { AppContext } from "@/app/context";
import { Question } from "@/lib/graphql/generated/graphql";
import { Types } from "@/lib/reducers";

import { DateTime } from "luxon";
import { block } from "million/react";
import { useContext, useEffect } from "react";
import { useCountdown } from "usehooks-ts";

export default block(function QuestionCard(question: Question) {
  const { state, dispatch } = useContext(AppContext);

  const remainingSeconds =
    DateTime.fromISO(question.postedTimestamp)
      .plus({ seconds: question.ttl })
      .diffNow()
      .toMillis() / 1000;

  const [count, { startCountdown }] = useCountdown({
    countStart: Math.floor(remainingSeconds),
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  useEffect(() => {
    if (count === 0) {
      dispatch({
        type: Types.Remove,
        payload: {
          id: question.id,
        },
      });
    }
  }, [question.id, count, dispatch]);

  return (
    <div
      className={`w-full h-full rounded-md flex flex-col transition shadow-md ${
        count <= 15 ? "bg-red-200 text-red-600 shadow-red-300" : ""
      }`}
    >
      <div className="p-4 grow">
        <p className="text-lg font-medium overflow-hidden">
          {question.question}
        </p>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-neutral-600">
          {`${count} seconds`}
        </p>
      </div>
    </div>
  );
});
