import React, { useState, useEffect } from "react";
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
import "react-native-get-random-values";
import uuid from "react-native-uuid";
import { auth, db } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export default function FinancesScreen({ navigation }) {
  const user = auth.currentUser;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      fetchPayments(user.uid);
    }
  }, [user?.uid]);

  // fetch payments for current user
  const fetchPayments = async (userId) => {
    try {
      const q = query(
        collection(db, "payments"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedPayments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(fetchedPayments);
    } catch (error) {
      console.log("Error fetching payments: ", error);
    }
  };

  const addPayment = async (newPayment) => {
    if (user) {
      const userPayments = doc(db, "payments", uuid.v4());
      await setDoc(userPayments, {
        ...newPayment,
        userId: user.uid,
      });
      fetchPayments(user.uid);
    }
  };

  const deletePayment = (id) => {
    {
      Alert.alert(
        "Delete this item?",
        "Are you sure you want to delete this payment?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              console.log("Deleted payment.");
              await deleteDoc(doc(db, "payments", id));
              setPayments((prevPayments) =>
                prevPayments.filter((p) => p.id !== id)
              );
            },
          },
        ]
      );
    }
  };

  // update payment type if date has past
  useEffect(() => {
    const updatedPayments = payments.map((payment) => {
      const today = new Date();
      const [month, day, year] = payment.date ? payment.date.split("-") : ["0000", "00", "00"];
      const payDate = new Date(year, month - 1, day);

      if (today > payDate) {
        return { ...payment, type: "Past" };
      }
      return payment;
    });

    const updated = updatedPayments.some((p, i) => p.type !== payments[i].type);

    if (updated) {
      setPayments(updatedPayments);

      updatedPayments.forEach(async (payment) => {
        if (payment.type === "Past") {
          const ref = doc(db, "payments", payment.id);
          await updateDoc(ref, { type: "Past" });
        }
      });
    }
  }, [payments]);

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
          .map((payment) => (
            <PaymentCard
              key={payment.id}
              {...payment}
              onDelete={deletePayment}
            />
          ))}
        <Text style={styles.text}>Past</Text>
        {payments
          .filter((payment) => payment.type === "Past")
          .map((payment) => (
            <PaymentCard
              key={payment.id}
              {...payment}
              onDelete={deletePayment}
            />
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
    fontSize: 22,
    padding: 10,
    marginBottom: 6,
    marginTop: 6,
  },
});
