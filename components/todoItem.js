import React from "react";
import Moment from "react-moment";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
{/* <MaterialIcons name="delete-outline" size={24} color="black" /> */}
export default function TodoItem({ pressHandler, item }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.item}>
        <MaterialIcons name="delete-outline" size={32}  />
        <View style={{ marginLeft: "5px" }}>
          <Text>
            {item.text}
            <br />
            <br />
            Shoud done by:
            <Moment element={Text} format="YYYY/MM/DD">
              {item.date}
            </Moment>
          </Text>
        </View>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
});
