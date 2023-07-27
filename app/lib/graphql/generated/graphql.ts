/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  submitQuestion: Question;
};


export type MutationSubmitQuestionArgs = {
  question: Scalars['String']['input'];
  ttl: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  questions: Array<Question>;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  postedTimestamp: Scalars['DateTime']['output'];
  question: Scalars['String']['output'];
  ttl: Scalars['Int']['output'];
};

export type SubmitQuestionMutationVariables = Exact<{
  question: Scalars['String']['input'];
  ttl: Scalars['Int']['input'];
}>;


export type SubmitQuestionMutation = { __typename?: 'Mutation', submitQuestion: { __typename?: 'Question', id: string, postedTimestamp: any, ttl: number, question: string } };


export const SubmitQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"question"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ttl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"question"},"value":{"kind":"Variable","name":{"kind":"Name","value":"question"}}},{"kind":"Argument","name":{"kind":"Name","value":"ttl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ttl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postedTimestamp"}},{"kind":"Field","name":{"kind":"Name","value":"ttl"}},{"kind":"Field","name":{"kind":"Name","value":"question"}}]}}]}}]} as unknown as DocumentNode<SubmitQuestionMutation, SubmitQuestionMutationVariables>;