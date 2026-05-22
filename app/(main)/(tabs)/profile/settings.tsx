import { StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

const switchTrack = { false: colors.elevated, true: colors.primary };

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [offers, setOffers] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Order notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={switchTrack}
          thumbColor={colors.onPrimary}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Promotional offers</Text>
        <Switch
          value={offers}
          onValueChange={setOffers}
          trackColor={switchTrack}
          thumbColor={colors.onPrimary}
        />
      </View>
      <Text style={styles.note}>More settings coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: { ...text.h3 },
  note: { ...text.caption, marginTop: spacing.lg },
});
