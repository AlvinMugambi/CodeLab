import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../components/Login";
import Profiles from "../components/AllProfiles";
import App from "./Main";

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
    initialRouteName: "Loading"
  }
);

export default createAppContainer(Navigator);
