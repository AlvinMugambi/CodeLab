import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 256,
    height: 255
  }
});

export default SplashScreen;
