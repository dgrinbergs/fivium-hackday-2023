import { AppContext } from "@/app/context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { block } from "million/react";
import { useContext } from "react";
import NewQuestionForm from "./question/NewQuestionForm";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default block(function Header() {
  const {
    state: { questions },
  } = useContext(AppContext);

  return (
    <ApolloProvider client={client}>
      <header className="flex flex-col sm:flex-row justify-between items-center pb-4">
        <h1 className="text-2xl font-medium">{`${questions.length} Active ${
          questions.length == 1 ? "question" : "questions"
        }`}</h1>
        <NewQuestionForm />
      </header>
    </ApolloProvider>
  );
});
