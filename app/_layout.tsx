import { Stack } from "expo-router";

import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { theme } from "@/src/colors/theme";

const RootLayout = () => {
  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar backgroundColor={theme.colors.background}/>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ title: "Movie details" }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
