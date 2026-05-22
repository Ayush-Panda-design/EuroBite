import { router } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { RestaurantCard } from "@/src/components/RestaurantCard";
import { RESTAURANTS } from "@/src/constants/data";
import { colors, spacing } from "@/src/constants/theme";

export default function HomeScreen() {
  return (
    <FlatList
      style={styles.list}
      data={RESTAURANTS}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <RestaurantCard
          restaurant={item}
          onPress={() => router.push(`/(main)/restaurant/${item.id}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
});
