import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { useCart } from "@/src/context/CartContext";
import { useTabBarInsets } from "@/src/hooks/useTabBarInsets";
import { createPremiumHeader } from "@/src/navigation/premiumHeader";
import { colors } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function TabsLayout() {
  const { itemCount } = useCart();
  const { tabBarHeight, tabBarPaddingBottom, tabBarPaddingTop, scenePaddingBottom } =
    useTabBarInsets();

  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: tabBarHeight,
          paddingBottom: tabBarPaddingBottom,
          paddingTop: tabBarPaddingTop,
          elevation: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.35,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          ...text.tabLabel,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        sceneStyle: {
          backgroundColor: colors.background,
          paddingBottom: scenePaddingBottom,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Restaurants",
          header: createPremiumHeader({
            subtitle: "Discover & order",
            headerIcon: "restaurant",
          }),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          header: createPremiumHeader({
            subtitle: "Find food you love",
            headerIcon: "search",
          }),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          header: createPremiumHeader({
            subtitle: "Cart & order history",
            headerIcon: "receipt",
          }),
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.danger, fontSize: 10 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
