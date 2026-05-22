import { TextStyle } from "react-native";
import { colors } from "./theme";

export const fonts = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semiBold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extraBold: "PlusJakartaSans_800ExtraBold",
};

export const text = {
  hero: {
    fontFamily: fonts.extraBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.text,
    letterSpacing: -0.6,
  } satisfies TextStyle,

  h1: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 30,
    color: colors.text,
    letterSpacing: -0.4,
  } satisfies TextStyle,

  h2: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.text,
    letterSpacing: -0.2,
  } satisfies TextStyle,

  h3: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.text,
    letterSpacing: 0,
  } satisfies TextStyle,

  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    letterSpacing: 0.1,
  } satisfies TextStyle,

  bodyMedium: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  } satisfies TextStyle,

  label: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.textMuted,
    letterSpacing: 0.2,
  } satisfies TextStyle,

  caption: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  } satisfies TextStyle,

  price: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.primaryLight,
    letterSpacing: 0.2,
  } satisfies TextStyle,

  button: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.onPrimary,
    letterSpacing: 0.3,
  } satisfies TextStyle,

  tabLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 0.3,
  } satisfies TextStyle,
};
