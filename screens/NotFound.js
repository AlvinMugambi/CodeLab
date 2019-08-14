import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/sad.gif")} />
      <Text style={styles.txt}>Oh my!</Text>
      <Text style={styles.txt}>Nothing Came Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height
  },
  img: {
    justifyContent: "center",
    alignSelf: "center",
    width: width
  },
  txt: {
    alignSelf: "center",
    fontSize: 20,
    padding: 20
  }
});

export default NotFound;
