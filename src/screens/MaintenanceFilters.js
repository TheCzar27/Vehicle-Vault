import React, { useContext } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text, Button, Pressable } from "react-native";
import FilterCheckbox from "../components/FilterCheckbox";
import { FilterContext } from "../utils/FilterContext";
import TopBar from "../components/TopBar";

export default function FilterScreen({ navigation, onPress }) {
	const { showOil, setShowOil, showFilter, setShowFilter, showTires, setShowTires } =
		useContext(FilterContext);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar headingTitle={"Select maintenance items to display"} />
			<View style={styles.container}>
				<View style={styles.filters}>
					<FilterCheckbox label="Show Tires" value={showTires} onValueChange={setShowTires} />
					<FilterCheckbox label="Show Oil" value={showOil} onValueChange={setShowOil} />
					<FilterCheckbox label="Show Filter" value={showFilter} onValueChange={setShowFilter} />
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
						<Text style={styles.buttonText}>Apply filters</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 40,
		justifyContent: "center",
	},
	filters: {
		height: "90%",
		marginBottom: 20,
	},
	buttonContainer: {
		alignItems: "center",
	},
	button: {
		width: 300,
		height: 50,
		backgroundColor: "#007bff",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	buttonText: {
		textAlign: "center",
		fontSize: 16,
		color: "#fff",
	},
});
