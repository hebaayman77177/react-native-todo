import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import DatePicker from "./datePicker";

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("which date to end!!");

  const changeHandler = (val) => {
    setText(val);
  };

  const pressHandler = () => {
    submitHandler(text, date);
    setText("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
      <View style={styles.input}>
        <DatePicker clicked={setDate}></DatePicker>
      </View>
      <Button color="coral" onPress={pressHandler} title="add todo" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
