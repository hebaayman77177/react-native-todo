import React, { useState } from "react";
import { View, Pressable, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "react-moment";

export default function DatePicker({ children, clicked }) {
  const [date, setDate] = useState(new Date(Date.now() + 3600 * 1000 * 24));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(
      "🚀 ~ file: datePicker.js ~ line 55 ~ onChange ~ currentDate",
      currentDate
    );
    console.log(
      "🚀 ~ file: datePicker.js ~ line 56 ~ onChange ~ currentDate",
      typeof currentDate
    );

    setShow(Platform.OS === "ios");
    setDate(currentDate);
    clicked(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
        <Pressable onPress={showDatepicker}>
          <Moment element={Text} format="YYYY/MM/DD">
            {date.toString()}
          </Moment>
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          dateFormat="DD/MM/YYYY"
        />
      )}
    </View>
  );
}
