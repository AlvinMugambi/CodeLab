import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Button
} from "react-native";
import { withNavigation } from "react-navigation";
import { Searchbar } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import LoadingScreen from "../components/CenterSpinner";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProfileItem from "../components/ProfileItem";
import Header from "../components/header";
import NotFound from "../screens/NotFound";

const { width, height } = Dimensions.get("window");

export const FETCH_USERS = gql`
  query($queryString: String!) {
    search(first: 100, type: USER, query: $queryString) {
      nodes {
        ... on User {
          id
          name
          avatarUrl
          url
          repositories {
            totalCount
          }
          starredRepositories {
            totalCount
          }
        }
      }
    }
  }
`;

class Profiles extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  state = {
    location: "lagos",
    language: "javascript"
  };

  onPress = value => {
    this.setState({
      location: value
    });
  };

  render() {
    const location = this.state.location;
    const language = this.state.language;
    return (
      <Query
        query={FETCH_USERS}
        variables={{ queryString: `location:${location} language:${language}` }}
      >
        {({ data, error, loading }) => {
          if (error) {
            return (
              <Text style={styles.errorText}>
                Woops! We ran into a problem. Kindly bear with us
              </Text>
            );
          }
          if (loading) {
            return (
              <View>
                <Header
                  action={this.onPress}
                  location={this.state.location}
                  page={"this screen"}
                />
                <LoadingScreen />
              </View>
            );
          }
          return (
            <View>
              <Header
                action={this.onPress}
                location={this.state.location}
                page={"this screen"}
              />
              {data.search.nodes.length == 0 ? (
                <NotFound />
              ) : (
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollViewContainer}
                >
                  <FlatList
                    data={data.search.nodes}
                    renderItem={({ item }) => (
                      <ProfileItem
                        profile={item}
                        navigation={this.props.navigation}
                      />
                    )}
                    keyExtractor={item => item.id.toString()}
                  />
                </ScrollView>
              )}
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white"
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    padding: 20
  },
  errorText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withNavigation(Profiles);
