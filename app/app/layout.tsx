"use client";

import Header from "@/components/Header";
import { DateTimeContext, QuestionContext } from "@/lib/context";
import { Question } from "@/lib/graphql/generated/graphql";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DateTime } from "luxon";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "http://192.168.100.91:8080/graphql",
  cache: new InMemoryCache(),
});

export default function RootLayout({ children }: LayoutProps) {
  const [questions, setQuestions] = useState<Array<Question>>([]);

  useEffect(() => {
    console.log("useEffect");
    const source = new EventSource("http://192.168.100.91:8080/events");
    source.onmessage = onNewQuestion;
    return () => source.close();
  }, []);

  function onNewQuestion({ isTrusted, data }: MessageEvent) {
    if (!isTrusted) return;
    const question: Question = JSON.parse(data);
    setQuestions((questions) => [question, ...questions]);
  }
  return (
    <html lang="en">
      <body className={`p-4 ${inter.className}`}>
        <ApolloProvider client={client}>
          <DateTimeContext.Provider value={DateTime.now()}>
            <QuestionContext.Provider value={questions}>
              <Header />
              {children}
            </QuestionContext.Provider>
          </DateTimeContext.Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}
