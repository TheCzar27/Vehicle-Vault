import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/screens/Welcome";
import LogInScreen from "./src/screens/LogIn";
import RegisterScreen from "./src/screens/Register";
import MaintenanceScreen from "./src/screens/Maintenance";
import GarageScreen from "./src/screens/Garage";
import Map from "./src/screens/Map";
import Finances from "./src/screens/Finances";
import AddPayment from "./src/screens/AddPayment";
import Analytics from "./src/screens/Analytics";
import Settings from "./src/screens/Settings";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function App() {
    // NOTE FOR TESTING, when testing your screen create an instance for it under
    //  Stack.Navigator like what is below. Comment or uncomment as needed, what
    //  is uncommented on top of the list will be the starting screen

    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor="#D9D9D9" />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="LogIn" component={LogInScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen
                        name="Maintenance"
                        component={MaintenanceScreen}
                    />
                    <Stack.Screen name="Garage" component={GarageScreen} />
                    <Stack.Screen name="Map" component={Map} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="Finances" component={Finances} />
                    <Stack.Screen name="AddPayment" component={AddPayment} />
                    <Stack.Screen name="Analytics" component={Analytics} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
