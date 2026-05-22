import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How can we help?</Text>
      <Text style={styles.text}>
        For delivery issues, wrong items, or payment questions, reach our support team.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL("mailto:support@fooddelivery.app")}
      >
        <Text style={styles.buttonText}>Email support</Text>
      </Pressable>
      <Text style={styles.faq}>Frequently asked</Text>
      <Text style={styles.q}>How long does delivery take?</Text>
      <Text style={styles.a}>Usually 20–40 minutes depending on the restaurant.</Text>
      <Text style={styles.q}>Can I change my order?</Text>
      <Text style={styles.a}>Contact support within 5 minutes of placing your order.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  title: { ...text.h2 },
  text: { ...text.body, marginTop: spacing.md },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonText: { ...text.button },
  faq: { ...text.h2, fontSize: 18, marginTop: spacing.xl },
  q: { ...text.h3, marginTop: spacing.md },
  a: { ...text.caption, marginTop: 4 },
});
