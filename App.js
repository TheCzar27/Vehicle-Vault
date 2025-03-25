import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FilterProvider } from "./src/utils/FilterContext";
import WelcomeScreen from "./src/screens/Welcome";
import LogInScreen from "./src/screens/LogIn";
import RegisterScreen from "./src/screens/Register";
import MaintenanceScreen from "./src/screens/Maintenance";
import GarageScreen from "./src/screens/Garage";
import SettingsScreen from "./src/screens/Settings"
import NotificationsScreen from "./src/screens/Notifications";
import LocationSettingsScreen from "./src/screens/LocationSettings";
import DisplaySettingsScreen from "./src/screens/DisplaySettings";
import ChangePasswordScreen from "./src/screens/ChangePassword";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicy";
import Map from "./src/screens/Map";
import Finances from "./src/screens/Finances";
import AddPayment from "./src/screens/AddPayment";
import Analytics from "./src/screens/Analytics";
import Settings from "./src/screens/Settings";
import { StatusBar } from "expo-status-bar";
import FilterScreen from "./src/screens/MaintenanceFilters";

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const FinancesStack = createStackNavigator();
const MaintenanceStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// stack nav for finanances and its subscreens
function FinancesScreens() {
	return (
		<FinancesStack.Navigator screenOptions={{ headerShown: false }}>
			<FinancesStack.Screen name="FinanceMain" component={Finances} />
			<FinancesStack.Screen name="Analytics" component={Analytics} />
			<FinancesStack.Screen name="AddPayment" component={AddPayment} />
		</FinancesStack.Navigator>
	);
}

function MaintenanceScreens() {
	return (
		<MaintenanceStack.Navigator screenOptions={{ headerShown: false }}>
			<MaintenanceStack.Screen name="MaintenanceMain" component={MaintenanceScreen} />
			<MaintenanceStack.Screen name="MaintenanceFilters" component={FilterScreen} />
		</MaintenanceStack.Navigator>
	);
}

function SettingsScreens () {
	return (
		<SettingsStack.Navigator screenOptions={{ headerShown: false }}>
			<SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />

			<SettingsStack.Screen name="Notifications" component={NotificationsScreen} />
			<SettingsStack.Screen name="LocationSettings" component={LocationSettingsScreen} />
			<SettingsStack.Screen name="DisplaySettings" component={DisplaySettingsScreen} />
			<SettingsStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
			<SettingsStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
			{ /*<SettingsStack.Screen name="TermsOfServices" component={TermsOfServicesScreen} />
			<SettingsStack.Screen name="LogOut" component={LogOutScreen} />
			<SettingsStack.Screen name="DeleteAccount" component={DeleteAccountScreen} /> */}
			

		</SettingsStack.Navigator>
	)
}

// tab nav for main screens
function MainScreensNav() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: "none" }}}>
			<Tab.Screen name="Garage" component={GarageScreen} />
			<Tab.Screen name="Maintenance" component={MaintenanceScreens} />
			<Tab.Screen name="Finances" component={FinancesScreens} />
			<Tab.Screen name="Map" component={Map} />
			<Tab.Screen name="Settings" component={SettingsScreens} />
		</Tab.Navigator>
	);
}

export default function App() {
	// NOTE FOR TESTING, when testing your screen create an instance for it under
	//  Stack.Navigator like what is below. Comment or uncomment as needed, what
	//  is uncommented on top of the list will be the starting screen

	return (
		<FilterProvider>
			<SafeAreaProvider>
				<StatusBar backgroundColor="#D9D9D9" />
				<NavigationContainer>
					<RootStack.Navigator screenOptions={{ headerShown: false }}>
						{/* <RootStack.Screen name="Welcome" component={WelcomeScreen} />
						<RootStack.Screen name="LogIn" component={LogInScreen} />
						<RootStack.Screen name="Register" component={RegisterScreen} /> */}
						{/* below are main screens */}
						<RootStack.Screen name="Main" component={MainScreensNav} />
					</RootStack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</FilterProvider>
	);
}
