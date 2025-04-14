import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TopBar({headingTitle, pressableIcon, iconFunction, showBack=false}) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: "#D9D9D9" }}>
            <View style={styles.container}>
                {/* adds a back arrow on the top bar to navigate back to the previous screen*/}
                {showBack && (
                    <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{ marginRight: 12 }} >
                        <MaterialCommunityIcons name="arrow-left" size={26} color="#000" />
                    </TouchableOpacity>
                )}
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
