import React from "react";
import { Text } from "react-native";
import { AsyncStorage } from "react-native";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import App from "../App";
import Profiles from "../screens/AllProfiles";
import { github } from "./getGithubTokenAsync";
import CenterSpinner from "../components/CenterSpinner";

const makeApolloClient = token => {
  const link = new HttpLink({
    uri: `https://api.github.com/graphql`,
    headers: {
      authorization: `Bearer ${token}`
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

export default class ApolloWrapper extends React.Component {
  state = {
    client: null
  };

  async componentDidMount() {
    console.log(this.props);
    let token = await AsyncStorage.getItem("@Expo:GithubToken");
    const client = makeApolloClient(token);
    this.setState({
      client
    });
  }

  render() {
    if (!this.state.client) {
      return <CenterSpinner />;
    }
    return (
      <ApolloProvider client={this.state.client}>
        <Profiles />
      </ApolloProvider>
    );
  }
}
