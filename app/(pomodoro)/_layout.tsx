import { Stack } from "expo-router";

export default function LayoutPomodoro() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Header" options={{ headerShown: false }} />
    </Stack>
  );
}
