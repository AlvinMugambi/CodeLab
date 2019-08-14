import * as React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

export default class GithubButton extends React.PureComponent {
  render() {
    return (
      <Icon.Button
        style={styles.githubButton}
        name="github"
        color="black"
        backgroundColor="white"
        onPress={this.props.onPress}
      >
        Sign In with Github
      </Icon.Button>
    );
  }
}

const styles = StyleSheet.create({
  githubButton: {
    shadowColor: "#000",
    borderColor: "black",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  }
});
