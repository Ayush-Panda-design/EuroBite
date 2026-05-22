import { Ionicons } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_NAME } from "@/src/constants/app";
import { colors, spacing } from "@/src/constants/theme";
import { fonts, text } from "@/src/constants/typography";

export type PremiumHeaderOptions = {
  subtitle?: string;
  showBrand?: boolean;
  headerIcon?: keyof typeof Ionicons.glyphMap;
};

type HeaderProps = {
  options: PremiumHeaderOptions & Record<string, unknown>;
  navigation: { goBack: () => void; canGoBack: () => boolean };
  back?: { title?: string } | undefined;
};

export function PremiumHeader({ options, navigation, back }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const screenTitle = getHeaderTitle(
    options as { title?: string; headerTitle?: string },
    "",
  );
  const subtitle = options.subtitle;
  const showBrand = options.showBrand !== false;
  const canGoBack = Boolean(back && navigation.canGoBack());
  const iconName = options.headerIcon ?? "restaurant";

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[colors.headerGradientStart, colors.headerGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { paddingTop: insets.top + spacing.sm }]}
      >
        {showBrand ? (
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Ionicons name="diamond" size={14} color={colors.primaryLight} />
            </View>
            <Text style={styles.brandName}>{APP_NAME}</Text>
          </View>
        ) : null}

        <View style={styles.row}>
          {canGoBack ? (
            <Pressable
              onPress={navigation.goBack}
              style={styles.backBtn}
              hitSlop={12}
              accessibilityLabel="Go back"
            >
              <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
            </Pressable>
          ) : (
            <View style={styles.symbolBox}>
              <Ionicons name={iconName} size={20} color={colors.primaryLight} />
            </View>
          )}
          <View style={styles.titleBlock}>
            <Text style={styles.title} numberOfLines={1}>
              {screenTitle}
            </Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <View style={styles.badge}>
            <Ionicons name="diamond-outline" size={18} color={colors.primaryLight} />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.accentLine} />
      <View style={styles.borderLine} />
    </View>
  );
}

const HEADER_BODY = 52;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
  gradient: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: 8,
  },
  brandIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.headerButtonBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  brandName: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.primaryLight,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: HEADER_BODY,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.headerButtonBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  symbolBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.headerButtonBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    ...text.h1,
    fontSize: 22,
  },
  subtitle: {
    ...text.caption,
    marginTop: 3,
    color: colors.textMuted,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.headerButtonBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  accentLine: {
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.7,
  },
  borderLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
