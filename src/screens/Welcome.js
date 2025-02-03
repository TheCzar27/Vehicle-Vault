import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>VEHICLE VAULT</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LogIn")}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9E0EC", // Background color from Figma
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 450, // width for the logo
    height: 500, // height for the logo
    resizeMode: "contain",
    marginBottom: -30,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    color: "#000", // Black color for the title
    marginBottom: 150, // Space between the title and the buttons
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center buttons horizontally
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "#000", // Black button color
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 10, // Space between buttons
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    color: "#fff", // White text for the button
    fontSize: 16,
    fontWeight: "bold",
  },
});
