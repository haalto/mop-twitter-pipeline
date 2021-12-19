import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Dashboard } from "./views/Dashboard";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
