import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://web.zapper.fi/graphql",
    cache: new InMemoryCache(),
});

export default client;