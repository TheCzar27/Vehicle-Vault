import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    Pressable,
} from "react-native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import Card from "../components/Card";
import FilterCheckbox from "../components/FilterCheckbox";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function MaintenanceScreen() {
    // state to control modal visibility
    const [modalVisible, setModalVisible] = useState(false);

    // function that is being called when button is pressed
    const openModal = () => {
        setModalVisible(true);
    };

    // states to track which filters are toggled
    const [showOil, setShowOil] = useState(true);
    const [showFilter, setShowFilter] = useState(true);
    const [showTires, setShowTires] = useState(true);

    const [color, setColor] = useState("#D9D9D9");

    useEffect(() => {
        let timer;
        if (modalVisible) {
            // wait 500ms, then set color
            timer = setTimeout(() => {
                setColor("rgba(0,0,0,0.5)");
            }, 0);
        } else {
            timer = setTimeout(() => {
                setColor("#D9D9D9");
            }, 0);
        }
        // cleanup if the effect re-runs or unmounts
        return () => clearTimeout(timer);
    }, [modalVisible]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated backgroundColor={color} />
            <TopBar
                headingTitle="Maintenance"
                pressableIcon={"filter"}
                iconFunction={openModal}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {showTires && (
                    <Card
                        IconComponent={MaterialCommunityIcons}
                        icon="tire"
                        iconSize={52}
                        title="Tires"
                        percentage="75%"
                        date="Rotate on 2/5/25"
                    />
                )}

                {showOil && (
                    <Card
                        IconComponent={FontAwesome5}
                        icon="oil-can"
                        iconSize={42}
                        title="Oil life"
                        percentage="25%"
                        date="Last changed: 2/8/25"
                    />
                )}

                {showFilter && (
                    <Card
                        IconComponent={MaterialCommunityIcons}
                        icon="air-filter"
                        iconSize={52}
                        title="Filter life"
                        percentage="25%"
                        date="Last changed: 2/8/25"
                    />
                )}
                {/* more cards later */}
            </ScrollView>

            <BottomBar />

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.modalBackground}
                    onPress={() => setModalVisible(false)}
                >
                </Pressable>

                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        Filter Maintenance Items
                    </Text>

                    <FilterCheckbox
                        label="Show Tires"
                        value={showTires}
                        onValueChange={setShowTires}
                    />
                    <FilterCheckbox
                        label="Show Oil"
                        value={showOil}
                        onValueChange={setShowOil}
                    />
                    <FilterCheckbox
                        label="Show Filter"
                        value={showFilter}
                        onValueChange={setShowFilter}
                    />

                    <Button
                        title="Close"
                        onPress={() => setModalVisible(false)}
                    />
                </View>
            </Modal>
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
    modalBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        position: "absolute",
        top: "30%",
        left: "10%",
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
});
