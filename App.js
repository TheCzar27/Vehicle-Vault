import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/screens/Welcome";
import LogInScreen from "./src/screens/LogIn";
import RegisterScreen from "./src/screens/Register";
import MaintenanceScreen from "./src/screens/Maintenance";
import GarageScreen from "./src/screens/Garage";
import SettingsScreen from "./src/screens/Settings";
import ChangePasswordScreen from "./src/screens/ChangePassword";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function App() {
  // NOTE FOR TESTING: when testing your screen, create an instance for it under
  // Stack.Navigator like what is below. Comment or uncomment as needed.
  // The first uncommented screen will be the starting screen.

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#D9D9D9" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
          <Stack.Screen name="Garage" component={GarageScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}