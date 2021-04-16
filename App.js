import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import moment from "moment";

const toPresentFilterGenerator = (filter) => {
  if (filter === "current") {
    return (item) => {
      return (
        item.state === "" &&
        moment(moment(item.date)).isAfter(moment().subtract("d", 1))
      );
    };
  }
  if (filter === "done") {
    return (item) => item.state === "done";
  }
  if (filter === "late") {
    return (item) =>
      item.state === "" &&
      !moment(moment(item.date)).isAfter(moment().subtract("d", 1));
  }
};

export default function App() {
  const [todos, setTodos] = useState([
    {
      text: "buy coffee",
      key: "1",
      date: moment().subtract(5, "d"),
      state: "",
    },
    { text: "create an app", key: "2", date: moment(), state: "" },
    { text: "play on the switch", key: "3", date: moment(), state: "" },
  ]);

  const [filter, setFilter] = useState("current");
  const toPresentFilter = useCallback(toPresentFilterGenerator(filter), [
    filter,
  ]);
  const toRepresentTodos = useMemo(
    () => todos.filter((todo) => toPresentFilter(todo)),
    [filter, todos]
  );

  const pressHandler = useCallback((key) => {
    if (filter === "done") return;
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.key != key) {
          return todo;
        }
        todo.state = "done";
        return todo;
      });
    });
  });

  const submitHandler = useCallback((text, date) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text, key: Math.random().toString(), date }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed");
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.todoControllers}>
            <Button
              color="coral"
              onPress={() => {
                console.log("pressed");
                setFilter("current");
              }}
              title="Current"
            />
            <Button
              color="coral"
              onPress={() => setFilter("done")}
              title="Done"
            />
            <Button
              color="coral"
              onPress={() => setFilter("late")}
              title="Late"
            />
          </View>
          <View style={styles.list}>
            <FlatList
              data={toRepresentTodos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  todoControllers: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
});
