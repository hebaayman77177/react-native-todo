import React from "react";
import Moment from "react-moment";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function TodoItem({ pressHandler, item }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <Text style={styles.item}>
        {item.text}
        <br />
        <br />
        Shoud done by: 
        <Moment element={Text} format="YYYY/MM/DD">
           {item.date}
        </Moment>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  },
});
