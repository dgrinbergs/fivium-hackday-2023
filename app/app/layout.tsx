"use client";

import Header from "@/components/Header";
import { DateTimeContext, QuestionContext } from "@/lib/context";
import { Question } from "@/lib/graphql/generated/graphql";
import { DateTime } from "luxon";
import { Inter } from "next/font/google";
import { useState } from "react";
import "./globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

const client = new ApolloClient({
  uri: "http://192.168.100.91:8080/graphql",
  cache: new InMemoryCache(),
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [questions, setQuestions] = useState<Array<Question>>([]);

  return (
    <html lang="en">
      <body className={`p-4 ${inter.className}`}>
        <ApolloProvider client={client}>
          <DateTimeContext.Provider value={DateTime.now()}>
            <QuestionContext.Provider value={{ questions, setQuestions }}>
              <Header />
              {children}
            </QuestionContext.Provider>
          </DateTimeContext.Provider>
        </ApolloProvider>
      </body>
    </html>
  );
}
