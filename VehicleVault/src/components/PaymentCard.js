import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
} from "react-native";

export default function PaymentCard({ category, name, amount, date, notes }) {
  const [month] = [date[0] + date[1]];
  const [day] = [date[2] + date[3]];
  const [year] = [date[4] + date[5] + date[6] + date[7]];
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.leftView}>
          <Text style={styles.text}>{category}</Text>
          <Text style={styles.text}>{notes}</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.text}>${amount}</Text>
          <Text style={styles.text}>
            {month}/{day}/{year}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#D9D9D9",
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 5,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
    alignItems: "flex-end",
    textAlignVertical: "top",
    includeFontPadding: false,
  },
  text: {
    fontSize: 16,
  },
});