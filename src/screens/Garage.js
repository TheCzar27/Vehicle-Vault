import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
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
import { auth, db } from "../config/firebaseConfig";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import AddVehicle from "../components/AddVehicle";
import { useVehicleContext } from "../utils/VehicleContext";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";


export default function Garage() {
  const {
    vehicles,
    setVehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    selectedVehicle,
  } = useVehicleContext();

  const [username, setUsername] = useState("");
  const [addVehicleModalVisible, setAddVehicleModalVisible] = useState(false);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (user?.uid) {
      fetchUserVehicles(user.uid);
      fetchUsername(user.uid);
    }
  }, [user?.uid]);

  const fetchUserVehicles = async (userId) => {
    try {
      const q = query(
        collection(db, "vehicles"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVehicles(fetched);
      if (fetched.length > 0 && !selectedVehicleId) {
        setSelectedVehicleId(fetched[0].id);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchUsername = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username || "User");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleAddVehicle = async (newVehicle) => {
    if (!user) return;
    try {
      const vehicleData = {
        userId: user.uid,
        vehicleName: newVehicle.vehicleName,
        vin: newVehicle.vin,
        fuelEfficiency: newVehicle.fuelEfficiency,
        vehicleLife: newVehicle.vehicleLife,
        tradeInValue: newVehicle.tradeInValue,
        registerDate: new Date().toLocaleDateString(),
        maintenance: "No Maintenance Needed",
        image: newVehicle.image || "default_vehicle.png",
      };
      const docRef = await addDoc(collection(db, "vehicles"), vehicleData);
      const newEntry = { id: docRef.id, ...vehicleData };
      setVehicles((prev) => [...prev, newEntry]);
      setSelectedVehicleId(docRef.id);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteDoc(doc(db, "vehicles", vehicleId));
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      if (selectedVehicleId === vehicleId) setSelectedVehicleId(null);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        headingTitle="Garage"
        onSwitchPress={() => navigation.navigate("SelectVehicle")}
        onAddPress={() => setAddVehicleModalVisible(true)}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {selectedVehicle ? (
          <View style={styles.detailContainer}>
            <Text style={styles.detailTitle}>
              {selectedVehicle.vehicleName}
            </Text>
            <Text>VIN: {selectedVehicle.vin}</Text>
            <Text>Fuel Efficiency: {selectedVehicle.fuelEfficiency} MPG</Text>
            <Text>Trade-in Value: ${selectedVehicle.tradeInValue}</Text>
            <Text>Vehicle Life: {selectedVehicle.vehicleLife} miles</Text>
            <Text>Register Date: {selectedVehicle.registerDate}</Text>
            <Text>Maintenance Alerts: {selectedVehicle.maintenance}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteVehicle(selectedVehicle.id)}
            >
              <Text style={styles.deleteText}>Delete Vehicle</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyGarage}>
            <Text style={styles.emptyText}>No vehicle selected</Text>
          </View>
        )}
        <View style={{ height: 60 }} />
      </ScrollView>

      <AddVehicle
        visible={addVehicleModalVisible}
        onClose={() => setAddVehicleModalVisible(false)}
        onAdd={handleAddVehicle}
      />

      <View style={styles.bottomBarWrapper}>
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  detailContainer: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  deleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyGarage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
  },
  bottomBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
