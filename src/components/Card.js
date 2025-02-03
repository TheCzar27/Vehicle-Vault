import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Card({ title, percentage, date, icon, iconSize, IconComponent }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.lowerContainer}>
                <View style={styles.icon}>
                    <IconComponent name={icon} size={iconSize} color="black" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.percentage}>{percentage}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#CFD6E1",
        height: 200,
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 40,
    },
    lowerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 144,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        height: 24,
    },
    icon: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
    },
    percentage: {
        marginTop: 8,
        fontSize: 20,
    },
    date: {
        marginTop: 4,
        fontSize: 12,
        color: "#666",
    },
});
