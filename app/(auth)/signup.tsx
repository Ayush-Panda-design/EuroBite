import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { AuthInput } from "@/src/components/AuthInput";
import { useAuth } from "@/src/context/AuthContext";
import type { AuthErrors } from "@/src/lib/auth";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setErrors({});
    setLoading(true);
    try {
      const result = await signup(name, email, password, confirmPassword);
      if (Object.keys(result).length > 0) {
        setErrors(result);
        return;
      }
      router.replace("/onboarding");
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
        <Text style={styles.intro}>Join us and start ordering in minutes.</Text>

        <AuthInput label="Full name" value={name} onChangeText={setName} placeholder="Alex Johnson" error={errors.name} />
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
          placeholder="At least 8 characters"
          error={errors.password}
        />
        <AuthInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Repeat your password"
          error={errors.confirmPassword}
        />

        <Pressable style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },
  intro: { ...text.body, marginBottom: spacing.lg },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: { ...text.button },
});
