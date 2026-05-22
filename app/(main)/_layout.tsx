import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { premiumStackOptions } from "@/src/navigation/screenOptions";
import { colors } from "@/src/constants/theme";

export default function MainLayout() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="restaurant/[id]"
        options={{
          ...premiumStackOptions(),
          title: "Restaurant",
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          ...premiumStackOptions("Review & place order"),
          title: "Your Cart",
        }}
      />
    </Stack>
  );
}
