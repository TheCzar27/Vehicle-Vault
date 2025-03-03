import React, { useState } from "react";
import { SafeAreaView, TextInput, View, Text, ScrollView, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import FilterCheckbox from "../components/FilterCheckbox";

export default function NearbyAutoShops() {
    const [searchText, setSearchText] = useState("");
    const [showDealerships, setShowDealerships] = useState(true);
    const [showOilShops, setShowOilShops] = useState(true);
    const [showGasStations, setShowGasStations] = useState(true);
    const [showAutoShops, setShowAutoShops] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <TopBar headingTitle="Nearby Auto Shops & Gas Stations" />
            
            <TextInput
                style={styles.searchBox}
                placeholder="Your Location"
                value={searchText}
                onChangeText={setSearchText}
            />

            <View style={{ flex: 0.3 }}>
                <ScrollView contentContainerStyle={styles.filterContainer}>
                 <FilterCheckbox label="Dealerships" value={showDealerships} onValueChange={setShowDealerships} />
                 <FilterCheckbox label="Oil Shops" value={showOilShops} onValueChange={setShowOilShops} />
                    <FilterCheckbox label="Gas Stations" value={showGasStations} onValueChange={setShowGasStations} />
                    <FilterCheckbox label="Auto Shops" value={showAutoShops} onValueChange={setShowAutoShops} />
                 </ScrollView>
            </View>

            <View style={{ flex:0.7}}>
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapText}>Map Placeholder</Text>
                </View>
            </View>
            <BottomBar/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    searchBox: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    filterContainer: {
        paddingVertical: 10,
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
        marginTop: 5,
        borderRadius: 8,
        marginBottom: 10,
    },
    mapText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
    },
});