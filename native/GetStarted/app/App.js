import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./app/assets/components/AppButton";
import ListingsScreen from "./app/screens/ListingsScreen";
import Screen from "./app/assets/components/Screen";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

const Link = () => {
  const navigation = useNavigation();

  return (
    <AppButton
      title="Click"
      onPress={() => navigation.navigate("TweetsDetails", { id: 1 })}
    />
  );
};

const Tweets = ({ navigation }) => (
  <Screen>
    <Text>Tweets</Text>
    <Link />
  </Screen>
);

const TweetsDetails = ({ route }) => (
  <Screen>
    <Text>Tweets Details {route.params.id}</Text>
  </Screen>
);

const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="Tweets"
      component={Tweets}
      options={{
        headerStyle: { backgroundColor: "tomato" },
        headerTintColor: "white",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="TweetsDetails"
      component={TweetsDetails}
      // options={({ route }) => ({ title: route.params.id })}
    />
  </Stack.Navigator>
);

const AccountNavigator = () => (
  <Screen>
    <Text>Account</Text>
  </Screen>
);

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: "tomato",
      tabBarActiveTintColor: "white",
      tabBarInactiveBackgroundColor: "#eee",
      tabBarInactiveTintColor: "#000",
    }}
  >
    <Tab.Screen
      name="Feed"
      component={ListingsScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="account-check"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const demo = async () => {
    try {
      await AsyncStorage.setItem("person", JSON.stringify({ id: 1 }));

      const value = await AsyncStorage.getItem("person");
      const person = JSON.parse(value);

      console.log(person);
    } catch (error) {
      console.log(error);
    }
  };

  demo();

  return null;
}