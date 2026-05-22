import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { APP_NAME } from "@/src/constants/app";
import { colors, spacing } from "@/src/constants/theme";
import { fonts, text } from "@/src/constants/typography";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.drawerBg }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Ionicons name="diamond" size={14} color={colors.primaryLight} />
          <Text style={styles.brand}>{APP_NAME}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials ?? "?"}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? "Guest"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign out" onPress={handleLogout} labelStyle={styles.logoutLabel} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: spacing.lg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.md },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primaryLight,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: { ...text.h2, color: colors.onPrimary },
  name: { ...text.h2 },
  email: { ...text.caption, marginTop: 4 },
  logoutLabel: { ...text.label, color: colors.danger },
});
