import { Stack } from "expo-router";
import { createPremiumHeader } from "@/src/navigation/premiumHeader";
import { colors } from "@/src/constants/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "Create Account",
          header: createPremiumHeader({ subtitle: "Join EuroBite", headerIcon: "person" }),
        }}
      />
    </Stack>
  );
}
