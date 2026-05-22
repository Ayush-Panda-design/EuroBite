export const colors = {
  primary: "#5B9CF5",
  primaryDark: "#3B82F6",
  primaryLight: "#93C5FD",
  accent: "#F59E0B",

  background: "#13151C",
  backgroundAlt: "#181B24",
  surface: "#1E222C",
  elevated: "#262B36",
  card: "#232833",

  text: "#F4F4F5",
  textSecondary: "#D4D4D8",
  textMuted: "#A1A1AA",
  textLight: "#71717A",

  border: "#323845",
  divider: "#3D4454",

  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
  info: "#5B9CF5",

  onPrimary: "#FFFFFF",
  headerBack: "#F4F4F5",

  banner: "rgba(91, 156, 245, 0.14)",
  errorBg: "rgba(248, 113, 113, 0.15)",

  drawerBg: "#161920",
  tabBar: "#161920",
  header: "#161920",
  headerGradientStart: "#222630",
  headerGradientEnd: "#161920",
  headerButtonBg: "rgba(255, 255, 255, 0.06)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const headerStyle = {
  backgroundColor: colors.header,
  headerTintColor: colors.headerBack,
  headerTitleStyle: { fontWeight: "700" as const, color: colors.text },
  headerShadowVisible: false,
  headerBackTitle: "Back",
};

export const tabBarStyle = {
  backgroundColor: colors.tabBar,
  borderTopColor: colors.border,
  height: 60,
  paddingBottom: 8,
};

export const drawerStyle = {
  backgroundColor: colors.drawerBg,
};
