import React, { useState, useEffect, useContext } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Text,
	Button,
	Modal,
	Pressable,
} from "react-native";
// import { FilterContext } from "../contexts/FilterContext";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import Card from "../components/Card";
import FilterCheckbox from "../components/FilterCheckbox";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSmartCarAuth } from "../utils/smartcarAuth";
import { storeAuthTokens } from "../utils/storeAuthTokens";
import { auth, db } from "../config/firebaseConfig";
import { fetchVehicleData } from "../utils/fetchVehicleData";
import FilterScreen from "./MaintenanceFilters";
import { FilterContext } from "../utils/FilterContext";

export default function MaintenanceScreen({ navigation }) {
	const { request, promptAsync } = useSmartCarAuth();
	const user = auth.currentUser;
	const { showOil, showFilter, showTires } = useContext(FilterContext);

	return (
		<SafeAreaView style={styles.container}>
			<TopBar
				headingTitle="Maintenance"
				pressableIcon={"filter"}
				iconFunction={() => navigation.navigate("MaintenanceFilters")}
			/>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						gap: 8,
					}}
				>
					<Button title="Log Vehicle Data" onPress={() => promptAsync()} disabled={!request} />
					<Button
						title="Store tests tokens"
						onPress={() => fetchVehicleData()}
						disabled={!request}
					/>
				</View>
				{showTires && (
					<Card
						IconComponent={MaterialCommunityIcons}
						icon="tire"
						iconSize={52}
						title="Tires"
						percentage={"N/A"}
						date="Rotate on 2/5/25"
					/>
				)}

				{showOil && (
					<Card
						IconComponent={FontAwesome5}
						icon="oil-can"
						iconSize={42}
						title="Oil life"
						percentage={"N/A"}
						date="Last changed: 2/8/25"
					/>
				)}

				{showFilter && (
					<Card
						IconComponent={MaterialCommunityIcons}
						icon="air-filter"
						iconSize={52}
						title="Air Filter life"
						percentage="25%"
						date="Last changed: 2/8/25"
					/>
				)}
				{/* more cards later */}
			</ScrollView>

			<BottomBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollContent: {
		padding: 16,
		paddingTop: 40,
	},
});
