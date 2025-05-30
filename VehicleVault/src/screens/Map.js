import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, View, ScrollView, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import FilterCheckbox from "../components/FilterCheckbox";

const GOOGLE_API_KEY = "AIzaSyDdd_L4HDBlllc885zSEEqZEr_IX9zVGeY"; // API key using Places API, Maps SDK for Android, and Geocoding API

export default function NearbyAutoShops() {
  const [searchText, setSearchText] = useState(""); //tracks text entered in search input to look up address
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null); //region to be displayed on map
  const [places, setPlaces] = useState([]);

  const [showDealerships, setShowDealerships] = useState(true);
  const [showOilShops, setShowOilShops] = useState(true);
  const [showGasStations, setShowGasStations] = useState(true);
  const [showAutoShops, setShowAutoShops] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //gets user's current position as map default location
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location access is required to show nearby shops.");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  useEffect(() => {
    if (region) {
      fetchNearbyPlaces({ //makes sure location doesn't reset to user when changing filters
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  }, [showDealerships, showOilShops, showGasStations, showAutoShops]);

  const fetchNearbyPlaces = async (coords) => { //fetches nearby auto-related locations from Places API
    const keywords = [];
    if (showDealerships) keywords.push("dealership");
    if (showOilShops) keywords.push("oil change");
    if (showGasStations) keywords.push("gas station");
    if (showAutoShops) keywords.push("auto repair");

    if (keywords.length === 0) {
      setPlaces([]);
      return;
    }

    try {
      const keywordString = keywords.join(" OR ");
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=5000&keyword=${encodeURIComponent(keywordString)}&key=${GOOGLE_API_KEY}`;

      const response = await axios.get(url);
      setPlaces(response.data.results || []);
    } catch (error) {
      console.error("Google Places API error:", error.message);
      Alert.alert("Failed to load places", "Check your API key and network.");
    }
  };

  const geocodeAddress = async (address) => { //converts user-entered address into coordinates using Geocoding API
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
      );
      console.log("GEOCODING RESPONSE", res.data);
      if (res.data.results.length > 0) {
        const loc = res.data.results[0].geometry.location;
        const newCoords = {
          latitude: loc.lat,
          longitude: loc.lng,
        };
        setRegion({
          ...newCoords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setLocation(newCoords);
        fetchNearbyPlaces(newCoords);
      } else {
        Alert.alert("Address not found", "Try a more specific address.");
      }
    } catch (err) {
      console.error("Geocoding failed:", err.message);
      Alert.alert("Failed to find location", "Check your address and internet.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar headingTitle="Nearby Auto Shops & Gas Stations" />

      <TextInput
        style={styles.searchBox} //allows user to trigger geocode search on enter
        placeholder="Search or update your location"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => geocodeAddress(searchText)}
      />

      <View style={{ flex: 0.3 }}>
        <ScrollView contentContainerStyle={styles.filterContainer}>
          <FilterCheckbox label="Dealerships" value={showDealerships} onValueChange={setShowDealerships} />
          <FilterCheckbox label="Oil Shops" value={showOilShops} onValueChange={setShowOilShops} />
          <FilterCheckbox label="Gas Stations" value={showGasStations} onValueChange={setShowGasStations} />
          <FilterCheckbox label="Auto Shops" value={showAutoShops} onValueChange={setShowAutoShops} />
        </ScrollView>
      </View>

      <View style={{ flex: 0.7, borderRadius: 8, overflow: "hidden" }}>
        {region && (
          <MapView style={{ flex: 1 }} region={region} showsUserLocation>
            {places.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                title={place.name}
                description={place.vicinity}
              />
            ))}
          </MapView>
        )}
      </View>

      <BottomBar />
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
});
