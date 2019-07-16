import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import Splash from "./components/Splash";
import Login from "./components/Login";
import Profiles from "./components/AllProfiles";
import MyApollo from "./components/apollo";

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

const Navigator = createSwitchNavigator(
  {
    // For authentication
    Auth: Login,
    // For fetching all profiles
    Profiles: Profiles,
    // Main app
    Main: App
  },
  {
    initialRouteName: "Main"
  }
);

export default createAppContainer(Navigator);
