import React from 'react'
import { 
    SafeAreaView,
    ScrollView, 
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import {
  BarChart,
  PieChart,
} from "react-native-gifted-charts";

export default function AnalyticsScreen({ navigation, route }) {
  const { payments } = route.params || {};
  console.log("Payments received in Analytics page:", payments);

  const average = "50.00";
  const year = "2025";
  
  const processPayments = (payments) => {
    const monthlyTotals = Array(12).fill(0); 

    payments.forEach((payment) => {
      if (payment.date) {
        const date = new Date(payment.date);
        if (!isNaN(date)) {
          const month = date.getMonth();
          monthlyTotals[month] += parseFloat(payment.amount) || 0;
        } else {
          console.warn("Invalid date:", payment.date);
        }
      }
    });

    console.log("Monthly totals: ", monthlyTotals);

    return monthlyTotals.map((value, index) => ({
      value,
      label: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][index],
    }));
  };

  const monthlyData = processPayments(payments);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={"#D9D9D9"} />
      <TopBar headingTitle="Analytics" />
      <View style={styles.tab}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnTxt}
        >
          <Text>Finances</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.itemsContainer}>
        <Text style={styles.text}>Monthly Costs</Text>
        <View style={styles.monthlyContainer}>
          <Text>Average per month:</Text>
          <Text>${average}</Text>
          <Text>Jan {year}-Dec {year}</Text>
          <BarChart
            data={monthlyData}
            barWidth={22}
            spacing={15}
            isAnimated
            frontColor="#3498db"
          />
        </View>
        <Text style={styles.text}>Cost Structure</Text>
        <View style={styles.costContainer}>
          {/* <PieChart /> */}
        </View>
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
  monthlyContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    padding: 10,
    margin: 10,
  },
  costContainer: {
    height: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    padding: 10,
    margin: 10,
  },
});