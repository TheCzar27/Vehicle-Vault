import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, { getDefaultStyles } from "react-native-ui-datepicker";

export default function AddPayment({ navigation, route }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState(null);
  const [itemsType, setItemsType] = useState([
    { label: "Select an item", value: null },
    { label: "Upcoming", value: "Upcoming" },
    { label: "Past", value: "Past" },
  ]);

  const [openCategory, setOpenCat] = useState(false);
  const [valueCategory, setValueCat] = useState(null);
  const [itemsCategory, setItemsCat] = useState([
    { label: "Select an item", value: null },
    { label: "Car Payment", value: "Car Payment" },
    { label: "Insurance", value: "Insurance" },
    { label: "Refuel", value: "Refuel" },
    { label: "Car Wash", value: "Car Wash" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Other", value: "Other" },
  ]);

  const { addPayment } = route.params;

  const handleSubmit = () => {
    if (!name || !amount || !date || !valueType || !valueCategory) {
      Alert.alert("Error", "Please fill all fields before saving.");
      return;
    }
    const newPayment = {
      type: valueType,
      category: valueCategory,
      name,
      amount,
      date,
      notes,
    };

    addPayment(newPayment);
    navigation.goBack();
  };

  const defaultStyles = getDefaultStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor={"#D9D9D9"} />
      <KeyboardAwareScrollView>
        <Text style={styles.title}>Add an upcoming or past payment</Text>

        <Text style={styles.text}>Type</Text>
        <DropDownPicker
          open={openType}
          value={valueType}
          items={itemsType}
          setOpen={setOpenType}
          setValue={setValueType}
          setItems={setItemsType}
          style={styles.dropdown}
          zIndex={1}
          onChangeItem={(item) => setValue(item.valueType)}
        />

        <Text style={styles.text}>Category</Text>
        <DropDownPicker
          open={openCategory}
          value={valueCategory}
          items={itemsCategory}
          setOpen={setOpenCat}
          setValue={setValueCat}
          setItems={setItemsCat}
          style={styles.dropdown}
          zIndex={-1}
          onChangeItem={(item) => setValue(item.valueCategory)}
          nestedScrollEnabled={true}
        />

        <Text style={[styles.text, { zIndex: -2 }]}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder={"Enter name of payment"}
          placeholderTextColor="#A9A9A9"
          maxLength={20}
          value={name}
          onChangeText={(text) => setName(text)}
          zIndex={-2}
        />
        <Text style={[styles.charCount, { marginBottom: -15, zIndex: -2 }]}>
          {name.length}/20
        </Text>

        <Text style={[styles.text, { zIndex: -2 }]}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder={"$0.00"}
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          maxLength={8}
          value={amount}
          onChangeText={(amt) => setAmount(amt)}
          zIndex={-2}
        />

        <Text style={[styles.text, { zIndex: -2 }]}>Date of Payment</Text>
        <TextInput
          style={styles.input}
          placeholder={"MM/DD/YYYY"}
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          maxLength={8}
          value={date}
          onChangeText={(text) => setDate(text)}
          zIndex={-2}
        />

        {/* Note: (In progress) DatePicker is getting date from user input (& displays in console) but not passing correctly to create PaymentCards to display on Finances page */}

        {/* <DateTimePicker
          mode="single"
          date={selectedDate}
          minDate={"2000-01-01"}
          maxDate={"2030-12-31"}
          // classNames={{
          //   ...defaultStyles,
          //   today: { borderColor: "blue", borderWidth: 1 }, // Add a border to today's date
          //   selected: { backgroundColor: "blue" }, // Highlight the selected day
          //   selected_label: { color: "white" }, // Highlight the selected day label
          // }}
          onChange={({ date }) => {
            console.log("Selected date: " + date.toDateString());
            setSelectedDate(date);
          }}
          style={[defaultStyles, { marginTop: 4, zIndex: -2 }]}
        /> */}

        <Text style={[styles.text, { zIndex: -2 }]}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, { height: 65 }]}
          placeholder="Enter notes here"
          placeholderTextColor="#A9A9A9"
          multiline
          maxLength={100}
          numberOfLines={2}
          value={notes}
          onChangeText={(notes) => setNotes(notes)}
          zIndex={-2}
        />
        <Text style={[styles.charCount, { marginBottom: 30, zIndex: -2 }]}>
          {notes.length}/100
        </Text>

        <TouchableOpacity
          onPress={() => {
            handleSubmit();
            console.log("Save pressed");
          }}
          zIndex={-2}
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>Save</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    opacity: 0.9,
    marginLeft: "1%",
    marginTop: 11,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#00000",
    width: "100%",
    marginTop: 4,
    padding: 8,
    height: 45,
    backgroundColor: "#ffffff",
  },
  charCount: {
    fontSize: 14,
    textAlign: "right",
    marginTop: 2,
  },
  dropdown: {
    marginTop: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000000",
    backgroundColor: "#000000",
    width: "50%",
    marginLeft: "25%",
    alignItems: "center",
  },
  btnTxt: {
    color: "#ffffff",
    padding: 20,
    fontSize: 16,
    fontWeight: 500,
  },
});
