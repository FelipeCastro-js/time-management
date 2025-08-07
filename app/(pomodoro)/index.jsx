import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import Header from "./Header";
import Timer from "./Time";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function HomeScreen() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT", "BREAK");
  const [active, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      playSound();
      setIsActive(false);
      setIsWorking((prev) => prev);
      setTime(isWorking);
    }

    return () => clearInterval(interval);
  }, [active, time]);

  function handleStartStop() {
    setIsActive(!active);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/Despertador.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === "android" && 60,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {active ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
