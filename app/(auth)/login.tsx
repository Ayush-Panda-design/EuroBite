import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthInput } from "@/src/components/AuthInput";
import { useAuth } from "@/src/context/AuthContext";
import type { AuthErrors } from "@/src/lib/auth";
import { APP_NAME } from "@/src/constants/app";
import { colors, spacing } from "@/src/constants/theme";
import { fonts, text } from "@/src/constants/typography";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);
    try {
      const result = await login(email, password);
      if (Object.keys(result).length > 0) {
        setErrors(result);
        return;
      }
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.brandRow}>
          <Ionicons name="diamond" size={16} color={colors.primaryLight} />
          <Text style={styles.brand}>{APP_NAME}</Text>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
          }}
          style={styles.hero}
          contentFit="cover"
        />
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to order your favorite meals</Text>

        {errors.general ? <Text style={styles.banner}>{errors.general}</Text> : null}

        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          error={errors.email}
        />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Your password"
          error={errors.password}
        />

        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New here? </Text>
          <Link href="/(auth)/signup" style={styles.link}>
            Create an account
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, flexGrow: 1 },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.md,
  },
  brand: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.primaryLight,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  hero: { width: "100%", height: 180, borderRadius: 16, marginBottom: spacing.lg },
  title: { ...text.hero },
  subtitle: { ...text.body, marginBottom: spacing.lg },
  banner: {
    ...text.caption,
    backgroundColor: colors.errorBg,
    color: colors.danger,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: { ...text.button },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: spacing.lg },
  footerText: { ...text.caption },
  link: { ...text.bodyMedium, color: colors.primaryLight },
});
