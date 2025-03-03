import React, { useEffect } from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Welcome";
import LogIn from "./screens/LogIn";
import MaintenanceScreen from "./screens/Maintenance";
import SettingsScreen from "./screens/Settings";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

const Stack = createStackNavigator();

export default function App() {
    
    // NOTE FOR TESTING, when testing your screen create an instance for it under 
    //  Stack.Navigator like what is below. Comment or uncomment as needed, what 
    //  is uncommented on top of the list will be the starting screen

    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor="#D9D9D9"/>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Maintenance"
                        component={MaintenanceScreen}
                        options={{ headerShown: false }}
                    />
                    {/* Home Screen */}
                    {/* <Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>

					
					<Stack.Screen name="LogIn" component={LogIn} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
