import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_CONTENT_HEIGHT = 56;
const MIN_BOTTOM_INSET = Platform.OS === "android" ? 28 : 8;

export function useTabBarInsets() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, MIN_BOTTOM_INSET);
  const tabBarHeight = TAB_BAR_CONTENT_HEIGHT + bottomInset + 8;

  return {
    bottomInset,
    tabBarHeight,
    tabBarPaddingBottom: bottomInset + 6,
    tabBarPaddingTop: 10,
    scenePaddingBottom: tabBarHeight + 8,
  };
}
