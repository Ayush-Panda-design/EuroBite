import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { createRestaurantHeader } from "@/src/navigation/premiumHeader";
import { colors } from "@/src/constants/theme";

export function premiumStackOptions(
  subtitle?: string,
): NativeStackNavigationOptions {
  return {
    header: createRestaurantHeader(subtitle),
    headerShown: true,
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.background },
  };
}
