import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TopBar({headingTitle, pressableIcon, iconFunction}) {
    return (
        <SafeAreaView style={{ backgroundColor: "#D9D9D9" }}>
            <View style={styles.container}>
                <Text style={styles.title}>{headingTitle}</Text>
                <TouchableOpacity onPress={iconFunction}>
                    <Ionicons name={pressableIcon} size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: "#D9D9D9",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
