import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Restaurant } from "@/src/constants/data";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

type Props = {
  restaurant: Restaurant;
  onPress: () => void;
};

export function RestaurantCard({ restaurant, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} contentFit="cover" />
      <View style={styles.body}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.meta}>
          {restaurant.cuisine} · ★ {restaurant.rating} · {restaurant.deliveryTime}
        </Text>
        <Text style={styles.menuCount}>{restaurant.menu.length} dishes available</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: "100%", height: 160 },
  body: { padding: spacing.md },
  name: { ...text.h3, fontSize: 18 },
  meta: { ...text.caption, marginTop: 4 },
  menuCount: { ...text.label, color: colors.primaryLight, marginTop: 8 },
});
