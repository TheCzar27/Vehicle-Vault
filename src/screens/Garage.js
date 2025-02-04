import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import VehicleCard from "../components/VehicleCard";
import FordEscape from "../../assets/Ford_Escape.png";
import ChevroletEquinox from "../../assets/Chevrolet_Equinox.png";

export default function GarageScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: "2024 Ford Escape",
      vin: "123456789abcdefg",
      fuelEfficiency: "22.9 MPG",
      tradeInValue: "$1,000,000",
      vehicleLife: "26,272.2 mi",
      registerDate: "12/31/2024",
      maintenance: "Brake Maintenance Needed",
      image: require("../../assets/Ford_Escape.png"),
    },
    {
      id: 2,
      name: "2017 Chevrolet Equinox",
      vin: "abcdefg1234567890",
      fuelEfficiency: "23.1 MPG",
      tradeInValue: "$1,000,001",
      vehicleLife: "25,292.3 mi",
      registerDate: "01/01/2025",
      maintenance: "No Maintenance Needed",
      image: require("../../assets/Chevrolet_Equinox.png"),
    },
  ];

  const handleVehiclePress = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <TopBar
        headingTitle="Garage"
        pressableIcon="add-outline"
        iconFunction={() => console.log("Add vehicle button pressed")}
      />

      {/* Vehicle List */}
      <ScrollView contentContainerStyle={styles.vehicleList}>
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onPress={handleVehiclePress}
          />
        ))}
      </ScrollView>

      {/* Modal for Vehicle Information */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedVehicle && (
              <>
                <Image
                  source={selectedVehicle.image}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedVehicle.name}</Text>
                <Text>VIN: {selectedVehicle.vin}</Text>
                <Text>Fuel Efficiency: {selectedVehicle.fuelEfficiency}</Text>
                <Text>Trade-in Value: {selectedVehicle.tradeInValue}</Text>
                <Text>Vehicle Life: {selectedVehicle.vehicleLife}</Text>
                <Text>
                  Vehicle Register Date: {selectedVehicle.registerDate}
                </Text>
                <Text>Maintenance Alerts: {selectedVehicle.maintenance}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

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
  modalImage: {
    width: 200,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
