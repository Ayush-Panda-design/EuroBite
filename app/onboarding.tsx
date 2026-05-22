import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { APP_NAME } from "@/src/constants/app";
import { colors, spacing } from "@/src/constants/theme";
import { fonts, text } from "@/src/constants/typography";

export default function OnboardingScreen() {
  const { user, completeOnboarding } = useAuth();

  if (!user) return <Redirect href="/(auth)/login" />;

  const handleStart = async () => {
    await completeOnboarding();
    router.replace("/(main)/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        }}
        style={styles.hero}
        contentFit="cover"
      />
      <View style={styles.content}>
        <View style={styles.brandRow}>
          <Ionicons name="diamond" size={18} color={colors.primaryLight} />
          <Text style={styles.brand}>{APP_NAME}</Text>
        </View>
        <Text style={styles.title}>Delicious food, delivered to your door</Text>
        <Text style={styles.subtitle}>
          Browse top restaurants, pick your favorites, and track your order — all
          in one place.
        </Text>
        <Pressable style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { width: "100%", height: "45%" },
  content: { flex: 1, padding: spacing.xl, justifyContent: "center" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.lg },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primaryLight,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: { ...text.hero },
  subtitle: { ...text.body, marginTop: spacing.md },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 14,
    alignItems: "center",
    marginTop: spacing.xl,
  },
  buttonText: { ...text.button, fontSize: 17 },
});
