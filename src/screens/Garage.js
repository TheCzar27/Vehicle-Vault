import React, { useState, useEffect } from "react";
import {
	View,
	ScrollView,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Text,
	Modal,
	Image,
} from "react-native";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	doc,
	deleteDoc,
	getDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig"; // Import Firestore and Auth
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import VehicleCard from "../components/VehicleCard";
import AddVehicle from "./AddVehicleScreen";

export default function Garage({navigation}) {
	const [vehicles, setVehicles] = useState([]);
	const [username, setUsername] = useState(""); // Store the username
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedVehicle, setSelectedVehicle] = useState(null); // Stores the vehicle selected for the modal
	const user = auth.currentUser;

	useEffect(() => {
		if (user?.uid) {
			fetchUserVehicles(user.uid);
			fetchUsername(user.uid);
		}
	}, [user?.uid]);
	// Function to fetch user's vehicles from Firestore
	const fetchUserVehicles = async (userId) => {
		try {
			const q = query(collection(db, "vehicles"), where("userId", "==", userId));
			const querySnapshot = await getDocs(q);
			const fetchedVehicles = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setVehicles(fetchedVehicles);
		} catch (error) {
			console.error("Error fetching vehicles:", error);
		}
	};

	// Function to fetch the username from Firestore
	const fetchUsername = async (userId) => {
		try {
			const userDocRef = doc(db, "users", userId);
			const userDoc = await getDoc(userDocRef);
			if (userDoc.exists()) {
				setUsername(userDoc.data().username || "User"); // Default if username is missing
			}
		} catch (error) {
			console.error("Error fetching username:", error);
		}
	};

	// Function to add vehicle to Firestore

	// Function to delete vehicle from Firestore
	const handleDeleteVehicle = async (vehicleId) => {
		try {
			await deleteDoc(doc(db, "vehicles", vehicleId));
			setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId));
		} catch (error) {
			console.error("Error deleting vehicle:", error);
			alert(`Error deleting vehicle: ${error.message}`);
		}
	};

	// Function to show the modal with vehicle details
	const handleShowVehicleDetails = (vehicle) => {
		setSelectedVehicle(vehicle);
		setModalVisible(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Top Bar */}
			<TopBar
				headingTitle={username ? `${username}'s Garage` : "Garage"} // display username
				pressableIcon="add-outline"
				iconFunction={() => navigation.navigate("AddVehicle")}
			/>

			{/* Vehicle List */}
			{vehicles.length === 0 ? (
				<View style={styles.emptyGarage}>
					<Text style={styles.emptyText}>No vehicles added</Text>
					<TouchableOpacity
						style={styles.addButton}
						onPress={() => navigation.navigate("AddVehicle")}
					>
						<Text style={styles.addButtonText}>Add a Vehicle</Text>
					</TouchableOpacity>
				</View>
			) : (
				<ScrollView contentContainerStyle={styles.vehicleList}>
					{vehicles.map((vehicle) => (
						<VehicleCard
							key={vehicle.id}
							vehicle={vehicle}
							onPress={() => handleShowVehicleDetails(vehicle)} // Open modal instead of navigating
							onDelete={handleDeleteVehicle}
						/>
					))}
				</ScrollView>
			)}

			{/* Vehicle Details Modal */}
			<Modal visible={modalVisible} animationType="slide" transparent={true}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						{selectedVehicle && (
							<>
								<Text style={styles.modalTitle}>{selectedVehicle.vehicleName}</Text>
								<Image source={{ uri: selectedVehicle.image }} style={styles.modalImage} />
								<Text>VIN: {selectedVehicle.vin}</Text>
								<Text>Fuel Efficiency: {selectedVehicle.fuelEfficiency} MPG</Text>
								<Text>Trade-in Value: ${selectedVehicle.tradeInValue}</Text>
								<Text>Vehicle Life: {selectedVehicle.vehicleLife} miles</Text>
								<Text>Register Date: {selectedVehicle.registerDate}</Text>
								<Text>Maintenance Alerts: {selectedVehicle.maintenance}</Text>
								<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
									<Text style={styles.closeButtonText}>Close</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>
			</Modal>

			{/* Add Vehicle Modal */}

			{/* Bottom Bar */}
			<BottomBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	vehicleList: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	emptyGarage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyText: {
		fontSize: 18,
		marginBottom: 10,
	},
	addButton: {
		backgroundColor: "#4682B4",
		padding: 12,
		borderRadius: 8,
	},
	addButtonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "90%",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalImage: {
		width: 200,
		height: 120,
		resizeMode: "contain",
		marginBottom: 10,
	},
	closeButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#4682B4",
		borderRadius: 5,
	},
	closeButtonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
});
