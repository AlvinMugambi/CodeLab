import * as React from "react";
import {
  Image,
  Text,
  View,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  Easing
} from "react-native";
import getEnvVars from "../env";
import firebase from "firebase";
import getGithubTokenAsync from "../config/getGithubTokenAsync";
import GithubButton from "../components/GithubButton";
import ApolloWrapper from "../config/apollo";
import CenterSpinner from "../components/CenterSpinner";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID
} = getEnvVars();
const GithubStorageKey = "@Expo:GithubToken";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID
};

function initializeFirebase() {
  // Prevent reinitializing the app in snack.
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
}

async function signInAsync(token) {
  try {
    if (!token) {
      const token = await getGithubTokenAsync();
      if (token) {
        await AsyncStorage.setItem(GithubStorageKey, token);
        return signInAsync(token);
      } else {
        return;
      }
    }
    const credential = firebase.auth.GithubAuthProvider.credential(token);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  } catch ({ message }) {
    alert(message);
  }
}

async function attemptToRestoreAuthAsync() {
  let token = await AsyncStorage.getItem(GithubStorageKey);
  if (token) {
    return signInAsync(token);
  }
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yValue: new Animated.Value(0),
      isSignedIn: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.setupFirebaseAsync();
  }

  setupFirebaseAsync = async () => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(async auth => {
      const isSignedIn = !!auth;
      this.setState({ isSignedIn });
      if (!isSignedIn) {
        attemptToRestoreAuthAsync();
      }
    });
  };

  _moveAnimation = () => {
    Animated.timing(this.state.yValue, {
      toValue: 150,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  render() {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};
      return <ApolloWrapper />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Animated.View
            style={[styles.animationView, { bottom: this.state.yValue }]}
          >
            <Image style={styles.logo} source={require("../assets/icon.png")} />
          </Animated.View>
        </View>
        <View style={styles.container}>
          <GithubButton onPress={() => signInAsync()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
    overflow: "hidden",
    resizeMode: "contain"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  },
  loginBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  button: {
    alignSelf: "center",
    backgroundColor: "blue",
    width: 100,
    height: 20
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    justifyContent: "center"
  }
});
