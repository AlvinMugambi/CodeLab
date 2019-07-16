import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList
} from "react-native";
import CenterSpinner from "./CenterSpinner";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ProfileItem from "./ProfileItem";

const { width, height } = Dimensions.get("window");

export const FETCH_USERS = gql`
  query {
    search(first: 50, type: USER, query: "language:javascript location:lagos") {
      nodes {
        ... on User {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

class Profiles extends React.Component {
  render() {
    return (
      <Query query={FETCH_USERS} variables={{ location: "lagos" }}>
        {({ data, error, loading }) => {
          if (error) {
            console.error(error);
            return <Text>Error</Text>;
          }
          if (loading) {
            return <CenterSpinner />;
          }
          return (
            <View>
              <View style={styles.header}>
                <View style={styles.logoDetail}>
                  <Image
                    style={styles.logo}
                    source={require("../assets/icon.png")}
                  />
                  <Text style={styles.logoText}>Code</Text>
                  <Text style={[styles.logoText, styles.specialText]}>Lab</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.titleText}>Javascript Developers</Text>
                  <View style={styles.location}>
                    <Image
                      style={styles.locationLogo}
                      source={require("../assets/location.png")}
                    />
                    <Text style={{ fontSize: 20 }}>Lagos</Text>
                  </View>
                </View>
              </View>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
              >
                <FlatList
                  data={data.search.nodes}
                  renderItem={({ item }) => <ProfileItem item={item} />}
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
  header: {
    borderColor: "black",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  logoDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 50,
    height: 50,
    justifyContent: "center",
    marginTop: 40,
    alignSelf: "center"
  },
  logoText: {
    justifyContent: "center",
    marginTop: 50,
    alignSelf: "center"
  },
  specialText: {
    color: "#3DD5D5"
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  titleText: {
    fontSize: 20
  },
  location: {
    flexDirection: "row",
    padding: 10
  },
  locationLogo: {
    marginTop: 3,
    width: 18,
    height: 18
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    padding: 20
  }
});

export default Profiles;
