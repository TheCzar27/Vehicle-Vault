import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("./assets/logo.png")} 
        style={styles.logo}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
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
    backgroundColor: "#D9E0EC", // background color from figma
    alignItems: "center",
    justifyContent: "center", 
    padding: 20,
  },
  logo: {
    width: 500, //  width for the logo
    height: 500, //  height for the logo
    resizeMode: "contain", 
    marginBottom: 60, 
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#000", // Black button color
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000", 
  },
  buttonText: {
    color: "#fff", // white text for button
    fontSize: 16,
    fontWeight: "bold",
  },
});
