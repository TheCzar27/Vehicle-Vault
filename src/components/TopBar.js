import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TopBar({ headingTitle, onSwitchPress, onAddPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Text style={styles.title}>{headingTitle}</Text>
      </View>

      <View style={styles.rightGroup}>
        {onSwitchPress && (
          <TouchableOpacity onPress={onSwitchPress} style={styles.icon}>
            <Ionicons name="car" size={24} color="#000" />
          </TouchableOpacity>
        )}
        {onAddPress && (
          <TouchableOpacity onPress={onAddPress} style={styles.icon}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingLeft: 10,
  },
});
