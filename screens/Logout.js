import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import firebase from "firebase";
import LogoutButton from "../components/logoutButton";

export async function signOutAsync() {
  try {
    await AsyncStorage.removeItem(GithubStorageKey);
    await firebase.auth().signOut();
  } catch ({ message }) {
    alert("Error: " + message);
  }
}

class Logout extends React.Component {
  logoutUser = () => {
    const {
      navigation: { navigate }
    } = this.props;
    signOutAsync();
    navigate("Login");
  };

  render() {
    return <LogoutButton onPress={this.logoutUser} />;
  }
}

export default Logout;
