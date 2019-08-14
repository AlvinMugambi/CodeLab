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
import NotFound from "../screens/NotFound";

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Profiles: Profiles,
    UserProfile: UserProfile,
    NotFound: NotFound
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
