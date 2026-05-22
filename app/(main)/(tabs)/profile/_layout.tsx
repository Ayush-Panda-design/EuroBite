import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/src/components/CustomDrawerContent";
import { createPremiumHeader } from "@/src/navigation/premiumHeader";
import { colors, drawerStyle } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function ProfileDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerLabelStyle: { ...text.bodyMedium, color: colors.text },
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Profile",
          header: createPremiumHeader({ subtitle: "Your account", headerIcon: "person" }),
        }}
      />
      <Drawer.Screen
        name="my-orders"
        options={{
          title: "My Orders",
          header: createPremiumHeader({ subtitle: "Past deliveries", headerIcon: "receipt" }),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          header: createPremiumHeader({ subtitle: "Preferences", headerIcon: "settings" }),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: "Help",
          header: createPremiumHeader({ subtitle: "Support & FAQ", headerIcon: "help-circle" }),
        }}
      />
    </Drawer>
  );
}
