import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import DropdownMenu from "react-native-dropdown-menu";

class Header extends React.Component {
  state = {
    txt: ""
  };
  render() {
    const { action, location, page } = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.logoDetail}>
          <Image style={styles.logo} source={require("../assets/icon.png")} />
          <Text style={styles.logoText}>Code</Text>
          <Text style={[styles.logoText, styles.specialText]}>Lab</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Javascript Developers</Text>
          <View style={styles.location}>
            <Image
              style={styles.locationLogo}
              source={require("../assets/location.png")}
            />
            {page ? (
              <TextInput
                style={styles.textInput}
                value={this.state.txt}
                onChangeText={value => this.setState({ txt: value })}
                autoFocus
                placeholder={location}
                placeholderTextColor={"black"}
                onSubmitEditing={event => action(event.nativeEvent.text)}
                onBlur={() => this.setState({ isEditing: false })}
              />
            ) : (
              <Text>{location}</Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderColor: "black",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 0
  },
  logoDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 50,
    height: 50,
    justifyContent: "center",
    marginTop: 40,
    alignSelf: "center"
  },
  logoText: {
    justifyContent: "center",
    marginTop: 50,
    alignSelf: "center"
  },
  specialText: {
    color: "#3DD5D5"
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  titleText: {
    fontSize: 20
  },
  location: {
    flexDirection: "row",
    padding: 10
  },
  locationLogo: {
    marginTop: 3,
    width: 18,
    height: 18,
    marginRight: 5
  },
  textInput: {
    paddingLeft: 5,
    fontSize: 20
  }
});

export default Header;
