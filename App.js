import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Splash from "./components/Splash";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "splash"
    };
    setTimeout(() => {
      this.setState({
        currentScreen: "Login"
      });
    }, 2000);
  }

  render() {
    const { currentScreen } = this.state;
    let mainscreen = currentScreen === "splash" ? <Splash /> : <Login />;
    return mainscreen;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
