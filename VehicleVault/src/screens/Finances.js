import React, { useState, } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import PaymentCard from "../components/PaymentCard";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FinancesScreen({ navigation }) {
  const [payments, setPayments] = useState([]);

  const addPayment = (newPayment) => {
    setPayments([...payments, newPayment]);
  };

   const deletePayment = (index) => {
     {
       Alert.alert(
         "Delete this item?",
         "Are you sure you want to delete this payment?",
         [
           { text: "Cancel", style: "cancel" },
           {
             text: "Delete",
             style: "destructive",
             onPress: () => {
              const updatedPayments = payments.filter((_, i) => i !== index);
              setPayments(updatedPayments);
             },
           },
         ]
       );
     }
   };

   const renderRightActions = (index) => {
     return (
       <TouchableOpacity
         style={styles.deleteBtn}
         onPress={() => deletePayment(index)}
       >
        <MaterialCommunityIcons
          name={"delete"}
          size={24}
          color="black"
        />
       </TouchableOpacity>
     );
   };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={"#D9D9D9"} />
      <TopBar
        headingTitle="Finances"
        pressableIcon={"add-outline"}
        iconFunction={() => navigation.navigate("AddPayment", { addPayment })}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Analytics", { payments });
        }}
        style={styles.btnTxt}
      >
        <Text>Analytics</Text>
      </TouchableOpacity>

      <ScrollView style={styles.itemsContainer}>
        <Text style={styles.text}>Upcoming</Text>
        {payments
          .filter((payment) => payment.type === "Upcoming")
          .map((payment, index) => (
            <ReanimatedSwipeable
              key={index}
              renderRightActions={() => renderRightActions(index)}
              friction={2}
              rightThreshold={40}
            >
              <PaymentCard key={index} {...payment} />
            </ReanimatedSwipeable>
          ))}
        <Text style={styles.text}>Past</Text>
        {payments
          .filter((payment) => payment.type === "Past")
          .map((payment, index) => (
            <ReanimatedSwipeable
              key={index}
              renderRightActions={() => renderRightActions(index)}
              friction={2}
              rightThreshold={40}
            >
              <PaymentCard key={index} {...payment} />
            </ReanimatedSwipeable>
          ))}
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  btnTxt: {
    fontSize: 22,
    padding: 5,
    marginLeft: "2%",
    opacity: 0.75,
  },
  itemsContainer: {
    height: "75%",
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
  deleteBtn: {
    backgroundColor: "rgb(212, 67, 67)",
    borderRadius: 10,
    margin: 10,
    marginLeft: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});
