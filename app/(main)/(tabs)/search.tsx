import { Image } from "expo-image";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { searchFood } from "@/src/constants/data";
import { colors, spacing } from "@/src/constants/theme";
import { fonts, text } from "@/src/constants/typography";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { restaurants, items } = useMemo(() => searchFood(query), [query]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TextInput
        style={styles.input}
        placeholder="Search restaurants or dishes..."
        placeholderTextColor={colors.textLight}
        value={query}
        onChangeText={setQuery}
      />

      {items.length > 0 ? (
        <>
          <Text style={styles.section}>Dishes</Text>
          {items.map((row) => (
            <Pressable
              key={`${row.restaurant.id}-${row.item.id}`}
              style={styles.itemRow}
              onPress={() => router.push(`/(main)/restaurant/${row.restaurant.id}`)}
            >
              <Image source={{ uri: row.item.image }} style={styles.thumb} contentFit="cover" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{row.item.name}</Text>
                <Text style={styles.itemSub}>{row.restaurant.name}</Text>
                <Text style={styles.price}>${row.item.price.toFixed(2)}</Text>
              </View>
            </Pressable>
          ))}
        </>
      ) : null}

      <Text style={styles.section}>Restaurants</Text>
      {restaurants.length === 0 ? (
        <Text style={styles.empty}>No results found. Try another search.</Text>
      ) : (
        restaurants.map((item) => (
          <Pressable
            key={item.id}
            style={styles.restRow}
            onPress={() => router.push(`/(main)/restaurant/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.restImg} contentFit="cover" />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSub}>{item.cuisine}</Text>
            </View>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  input: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  section: { ...text.h2, fontSize: 18, marginBottom: spacing.sm },
  itemRow: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumb: { width: 72, height: 72 },
  itemInfo: { flex: 1, padding: spacing.sm, justifyContent: "center" },
  itemName: { ...text.h3, fontSize: 15 },
  itemSub: { ...text.caption },
  price: { ...text.price, fontSize: 14, marginTop: 4 },
  restRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  restImg: { width: 56, height: 56, borderRadius: 8 },
  empty: { ...text.body, textAlign: "center", marginTop: spacing.xl },
});
