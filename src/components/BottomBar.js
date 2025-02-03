import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function BottomBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log("Button 1 pressed")}>
                <SimpleLineIcons name="wrench" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Button 2 pressed")}>
                <Ionicons name="cash-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Button 3 pressed")}>
                <Ionicons name="home-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Button 4 pressed")}>
                <FontAwesome name="map-o" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Button 4 pressed")}>
                <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 18,
        backgroundColor: "#D9D9D9",
    },
});
