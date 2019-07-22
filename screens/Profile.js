import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Share
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Header from "../components/header";

class UserProfile extends React.Component {
  static navigationOptions = {
    header: null
  };

  viewProfile = async link => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  onShare = async (link, name) => {
    try {
      const result = await Share.share({
        message: `Checkout ${name} GitHub profile: \n\n${link}`
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const item = this.props.navigation.getParam("profile", {});
    return (
      <View>
        <Header />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.userInfo}>
            <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
            <Text style={{ padding: 10, fontSize: 18 }}>{item.name}</Text>
          </View>
          <View style={styles.detail}>
            <View style={styles.infoText}>
              <Text style={[styles.text, { fontWeight: "bold", padding: 10 }]}>
                Github URL:
              </Text>
            </View>
            <View style={styles.infoText}>
              <Image
                style={styles.iconImage}
                source={require("../assets/link.png")}
              />
              <TouchableOpacity onPress={() => this.viewProfile(item.url)}>
                <Text
                  style={styles.link}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.url}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.text, { fontWeight: "bold", padding: 10 }]}>
              No. of Repos
            </Text>
            <View style={styles.infoText}>
              <Image
                style={styles.iconImage}
                source={require("../assets/book.png")}
              />
              <Text style={styles.text}>{item.repositories.totalCount}</Text>
            </View>
            <Text style={[styles.text, { fontWeight: "bold", padding: 10 }]}>
              Number of starred repos
            </Text>
            <View style={styles.infoText}>
              <Image
                style={styles.iconImage}
                source={require("../assets/star.png")}
              />
              <Text style={styles.text}>
                {item.starredRepositories.totalCount}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.sharebtn}
              onPress={() => this.onShare(item.url, item.name)}
            >
              <Text>Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userInfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    marginTop: 20,
    padding: 10,
    height: 250,
    width: 250,
    borderRadius: 125
  },
  detail: {
    padding: 50
  },
  text: {
    // padding: 10,
    fontSize: 15
  },
  infoText: {
    flexDirection: "row"
  },
  iconImage: {
    height: 20,
    width: 20
  },
  link: {
    color: "blue",
    marginLeft: 5
  },
  sharebtn: {
    marginTop: 20,
    width: 80,
    height: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#3DD5D5",
    borderRadius: 5
  }
});

export default UserProfile;
