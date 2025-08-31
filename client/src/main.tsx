import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { ApolloProvider } from "@apollo/client/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
} as any);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
