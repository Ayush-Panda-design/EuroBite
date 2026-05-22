import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function ProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {user ? (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        ) : null}
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text style={styles.buttonText}>Open menu</Text>
      </Pressable>
      <Text style={styles.hint}>
        Access your orders, settings, help, and sign out from the side menu.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { ...text.h1, color: colors.onPrimary },
  name: { ...text.h2, marginTop: spacing.md },
  email: { ...text.caption, marginTop: 4 },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.xl,
  },
  buttonText: { ...text.button, fontSize: 16 },
  hint: { ...text.body, marginTop: spacing.md, textAlign: "center" },
});
