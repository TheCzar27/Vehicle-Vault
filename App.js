import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const FinancesStack = createStackNavigator();

// stack nav for finanances and its subscreens
function FinancesScreens() {
	return (
		<FinancesStack.Navigator screenOptions={{ headerShown: false }}>
			<FinancesStack.Navigator name="FinanceMain" component={Finances} />
			<FinancesStack.Navigator name="Analytics" component={Analytics} />
			<FinancesStack.Navigator name="AddPayment" component={AddPayment} />
		</FinancesStack.Navigator>
	);
}

// tab nav for main screens
function MainScreensNav() {
	return (
		<Tab.Navigator>
			<Tab.Navigator name="Garage" component={GarageScreen} />
			<Tab.Navigator name="Maintenance" component={MaintenanceScreen} />
			<Tab.Navigator name="Finances" component={FinancesScreens} />
			<Tab.Navigator name="Map" component={Map} />
			<Tab.Navigator name="Settings" component={Settings} />
		</Tab.Navigator>
	);
}

export default function App() {
	// NOTE FOR TESTING, when testing your screen create an instance for it under
	//  Stack.Navigator like what is below. Comment or uncomment as needed, what
	//  is uncommented on top of the list will be the starting screen

	return (
		<SafeAreaProvider>
			<StatusBar backgroundColor="#D9D9D9" />
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false }}>
					<RootStack.Screen name="Welcome" component={WelcomeScreen} />
					<RootStack.Screen name="LogIn" component={LogInScreen} />
					<RootStack.Screen name="Register" component={RegisterScreen} />
					{/* below are main screens */}
					<RootStack.Screen name="Main" component={MainScreensNav} />
				</RootStack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
