import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button
} from "react-native";

class ProfileItem extends React.Component {
  render() {
    const { profile, navigation } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("UserProfile", { profile })}
        >
          <View style={styles.profileImgContainer}>
            <Image
              style={styles.profileImg}
              source={{ uri: profile.avatarUrl }}
            />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    overflow: "hidden",
    height: 52,
    width: 52,
    borderRadius: 40
  },
  profileImg: {
    height: 52,
    width: 52,
    borderRadius: 40
  },
  avatar: {
    height: 50,
    height: 50,
    borderRadius: 50
  },
  container: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 20
  },
  name: {
    justifyContent: "center",
    alignSelf: "center",
    padding: 10
  }
});

export default ProfileItem;
