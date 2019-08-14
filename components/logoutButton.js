import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const LogoutButton = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;
