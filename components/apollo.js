import React from "react";
import { Text } from "react-native";
import { AsyncStorage } from "react-native";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import App from "../App";
import Profiles from "./AllProfiles";
import { github } from "./getGithubTokenAsync";

const API_KEY = "f0394a8bae7e633af2f6d5b6c69ef0c143422bab";
const makeApolloClient = token => {
  const link = new HttpLink({
    uri: `https://api.github.com/graphql`,
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  });
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    link,
    cache
  });
  return client;
};

console.disableYellowBox = true;

export default class MyApollo extends React.Component {
  state = {
    client: null
  };

  // bootstrap session in componentDidMount
  async componentDidMount() {
    const { token } = this.props;
    console.log(token);
    const client = makeApolloClient(token);
    this.setState({
      client
    });
  }

  render() {
    if (!this.state.client) {
      return (
        <Text style={{ justifyContent: "center", alignSelf: "center" }}>
          Loading...
        </Text>
      );
    }
    return (
      <ApolloProvider client={this.state.client}>
        <Profiles />
      </ApolloProvider>
    );
  }
}
