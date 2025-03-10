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
import * as AuthSession from "expo-auth-session";

// SmartCar discovery endpoints
const discovery = {
    authorizationEndpoint: "https://connect.smartcar.com/oauth/authorize",
    tokenEndpoint: "https://auth.smartcar.com/oauth/token",
};

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

    const [tireDataState, setTireDataState] = useState(null);
    const [oilDataState, setOilDataState] = useState(null);

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

    // testing code ______________________________________________________

    const CLIENT_ID = "6020bae4-b2e3-4139-8e2f-8b524a5f6c92";
    const redirectUri = AuthSession.makeRedirectUri({
        scheme: "vehiclevault",
        useProxy: "false",
    });

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID, // Replace with your SmartCar client ID
            scopes: [
                "read_alerts",
                "read_diagnostics",
                "read_engine_oil",
                "read_extended_vehicle_info",
                "read_fuel",
                "read_vehicle_info",
                "read_odometer",
                "read_tires",
                "read_vin",
            ],
            redirectUri: redirectUri,
        },
        discovery
    );

    const exchangeTokenOnServer = async (code, redirectUri) => {
        try {
            const response = await fetch(
                "https://g2lvcqg4se.execute-api.us-east-2.amazonaws.com/dev/exchangeToken",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code, redirectUri }),
                }
            );
            console.log("Access code: ", code);
            console.log("redirectUri: ", redirectUri);
            const data = await response.json();
            if (data.access_token) {
                console.log(
                    "Access token received from server:",
                    data.access_token
                );
                return data.access_token;
            } else {
                console.error("Error from token exchange:", data);
                return null;
            }
        } catch (error) {
            console.error("Error calling token exchange endpoint:", error);
            return null;
        }
    };

    // OAuth response handler
    useEffect(() => {
        if (response?.type === "success" && response.params.code) {
            console.log("Authorization code:", response.params.code);
            // Pass the generated redirectUri along with the code
            exchangeTokenOnServer(response.params.code, redirectUri).then(
                (accessToken) => {
                    if (accessToken) {
                        fetchVehicleData(accessToken);
                    }
                }
            );
        } else if (response?.type === "error") {
            console.error("Authentication error:", response);
        }
    }, [response]);

    const fetchVehicleData = async (accessToken) => {
        try {
            // 1. Get the list of vehicles connected to the account.
            const vehiclesResponse = await fetch(
                "https://api.smartcar.com/v1.0/vehicles",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const vehiclesData = await vehiclesResponse.json();
            console.log("Vehicles list:", vehiclesData);

            if (!vehiclesData.vehicles || vehiclesData.vehicles.length === 0) {
                console.log("No vehicles connected.");
                return;
            }

            // Use the first vehicle in the list as an example.
            const vehicleId = vehiclesData.vehicles[0];
            console.log("Using vehicleId:", vehicleId);

            // 2. Fetch general vehicle information.
            const vehicleInfoResponse = await fetch(
                `https://api.smartcar.com/v1.0/vehicles/${vehicleId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const vehicleInfo = await vehicleInfoResponse.json();
            console.log("Vehicle Info:", vehicleInfo);
            // You might see properties like make, model, and year, for example:
            // console.log(`Make: ${vehicleInfo.make}, Model: ${vehicleInfo.model}, Year: ${vehicleInfo.year}`);

            // 3. Fetch the odometer data as an example of vehicle-specific data.
            const odometerResponse = await fetch(
                `https://api.smartcar.com/v1.0/vehicles/${vehicleId}/odometer`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const odometerData = await odometerResponse.json();
            console.log("Odometer Data:", odometerData);

            // oil
            const oilResponse = await fetch(
                `https://api.smartcar.com/v2.0/vehicles/${vehicleId}/engine/oil`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const oilData = await oilResponse.json();
            console.log("Oil life: ", oilData);
            console.log(oilData.lifeRemaining);
            setOilDataState(oilData);

            // tires
            const tireResponse = await fetch(
                `https://api.smartcar.com/v2.0/vehicles/${vehicleId}/tires/pressure`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const tireData = await tireResponse.json();
            console.log("Tire pressure status: ", tireData);
            console.log(tireData.frontLeft);
            setTireDataState(tireData);

            // gas
            const gasResponse = await fetch(
                `https://api.smartcar.com/v2.0/vehicles/${vehicleId}/fuel`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const gasData = await gasResponse.json();
            console.log("Gas data: ", gasData);
            console.log(gasData.percentRemaining);
        } catch (error) {
            console.error("Error fetching vehicle data:", error);
        }
    };

    // testing code ______________________________________________________

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated backgroundColor={color} />
            <TopBar
                headingTitle="Maintenance"
                pressableIcon={"filter"}
                iconFunction={openModal}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Button
                        title="Log Vehicle Data"
                        onPress={() => promptAsync()}
                        disabled={!request} // Ensure the request is ready
                    />
                    <Button
                        title="FetchVehicleData"
                        onPress={() => fetchVehicleData()}
                        disabled={!request} // Ensure the request is ready
                    />
                </View>
                {showTires && (
                    <Card
                        IconComponent={MaterialCommunityIcons}
                        icon="tire"
                        iconSize={52}
                        title="Tires"
                        percentage={
                            tireDataState
                                ? tireDataState.frontLeft * 0.1450377
                                : "N/A"
                        }
                        date="Rotate on 2/5/25"
                    />
                )}

                {showOil && (
                    <Card
                        IconComponent={FontAwesome5}
                        icon="oil-can"
                        iconSize={42}
                        title="Oil life"
                        percentage={
                            oilDataState
                                ? oilDataState.lifeRemaining * 100
                                : "N/A"
                        }
                        date="Last changed: 2/8/25"
                    />
                )}

                {showFilter && (
                    <Card
                        IconComponent={MaterialCommunityIcons}
                        icon="air-filter"
                        iconSize={52}
                        title="Air Filter life"
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
                ></Pressable>

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
