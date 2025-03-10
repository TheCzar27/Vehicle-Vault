import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SettingsScreen() {
  const navigation = useNavigation(); 

  // displayed list of settings
  // was thinking of also adding dark mode toggle, unit/measurement system, and a contact support/give feedback setting
  // but just gonna stick with the basics for now
  const settingsOptions = [
    {
      label: "Notifications",
      icon: "bell",
      onPress: () => console.log("Notifications Pressed"),
    },
    {
      label: "Location Settings",
      icon: "map-marker",
      onPress: () => console.log("Location Settings Pressed"),
    },
    {
      label: "Terms of Services",
      icon: "file-document-outline",
      onPress: () => console.log("Terms of Services Pressed"),
    },
    {
      label: "Privacy Policy",
      icon: "shield-lock-outline",
      onPress: () => console.log("Privacy Policy Pressed"),
    },
    {
      label: "Change Password",
      icon: "lock-reset",
      onPress: () => navigation.navigate("ChangePassword"), 
    },
    {
      label: "Log Out",
      icon: "logout",
      onPress: () => console.log("Log Out Pressed"),
    },
    {
      label: "Delete Account",
      icon: "delete-forever",
      onPress: () => console.log("Delete Account Pressed"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor="#D9D9D9" />

      <TopBar headingTitle="Settings" />

      {/* scrollable settings list */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {settingsOptions.map((item, index) => (
          <Pressable
            key={index}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            {/* setting icons */}
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icon}
                size={26}
                color={"#000"}
              />
            </View>

            {/* label for each setting */}
            <Text style={styles.settingLabel}>{item.label}</Text>
          </Pressable>
        ))}
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
  // each row in settings screen
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
