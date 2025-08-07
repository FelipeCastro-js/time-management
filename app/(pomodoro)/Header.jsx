import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((item, key) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.itemStyle,
            currentTime !== key && { borderColor: "transparent" },
          ]}
          onPress={() => handlePress(key)}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "white",
    marginVertical: 20,
  },
});
