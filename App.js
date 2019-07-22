import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./navigation/AppNavigator";

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default App;
