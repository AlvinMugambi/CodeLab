import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

class ProfileItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          alert("hello");
        }}
      >
        <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
