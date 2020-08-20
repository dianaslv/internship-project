import React from "react";
import { client } from "./Apollo/ApolloClient.js";
import { ApolloProvider } from "@apollo/client";
import Router from "./Router/Router";
import ContextProvider from "./Context/ContextProvider";

function App() {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <Router />
      </ContextProvider>
    </ApolloProvider>
  );
}

export default App;
