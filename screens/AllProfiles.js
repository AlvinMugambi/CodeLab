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
import LoadingScreen from "../components/CenterSpinner";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProfileItem from "../components/ProfileItem";
import Header from "../components/header";

const { width, height } = Dimensions.get("window");

export const FETCH_USERS = gql`
  query {
    search(first: 50, type: USER, query: "language:javascript location:lagos") {
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
  render() {
    return (
      <Query query={FETCH_USERS} variables={{ location: "lagos" }}>
        {({ data, error, loading }) => {
          if (error) {
            console.error(error);
            return (
              <Text>Woops! We ran into a problem. Kindly bear with us</Text>
            );
          }
          if (loading) {
            return <LoadingScreen />;
          }
          return (
            <View>
              <Header />
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
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    padding: 20
  }
});

export default withNavigation(Profiles);
