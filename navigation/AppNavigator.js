import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Login from "../screens/Login";
import Profiles from "../screens/AllProfiles";
import MyApollo from "../config/apollo";
import UserProfile from "../screens/Profile";
import ProfileItem from "../components/ProfileItem";

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Profiles: Profiles,
    UserProfile: UserProfile
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
