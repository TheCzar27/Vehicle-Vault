import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function VehicleCard({ vehicle, onPress }) {
  return (
    <TouchableOpacity
      style={styles.vehicleCard}
      onPress={() => onPress(vehicle)}
    >
      {/* Vehicle Info */}
      <View style={styles.vehicleInfo}>
        <Image source={vehicle.image} style={styles.vehicleImage} />
        <Text style={styles.vehicleName}>{vehicle.name}</Text>
      </View>
      {/* Vehicle Details */}
      <View style={styles.vehicleDetails}>
        <Text>VIN: {vehicle.vin}</Text>
        <Text>Fuel Efficiency: {vehicle.fuelEfficiency}</Text>
        <Text>Trade-in Value: {vehicle.tradeInValue}</Text>
        <Text>Vehicle Life: {vehicle.vehicleLife}</Text>
        <Text>Register Date: {vehicle.registerDate}</Text>
        <TouchableOpacity
          style={styles.moreInfoButton}
          onPress={() => onPress(vehicle)}
        >
          <Text style={styles.moreInfoText}>More Vehicle Information</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  vehicleCard: {
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  vehicleImage: {
    width: 100,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  vehicleDetails: {
    backgroundColor: "#B0E0E6",
    borderRadius: 5,
    padding: 10,
  },
  moreInfoButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4682B4",
    borderRadius: 5,
    alignItems: "center",
  },
  moreInfoText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
