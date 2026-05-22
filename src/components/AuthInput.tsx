import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { colors, spacing } from "@/src/constants/theme";
import { fonts, text } from "@/src/constants/typography";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function AuthInput({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.textLight}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { ...text.label, color: colors.textSecondary, marginBottom: 6 },
  input: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
  },
  inputError: { borderColor: colors.danger },
  error: { ...text.caption, color: colors.danger, marginTop: 4 },
});
