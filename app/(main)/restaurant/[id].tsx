import { Image } from "expo-image";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { MenuItemCard } from "@/src/components/MenuItemCard";
import { getRestaurantById } from "@/src/constants/data";
import { useCart } from "@/src/context/CartContext";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = getRestaurantById(id ?? "");
  const { addItem } = useCart();
  const navigation = useNavigation();

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({
        title: restaurant.name,
        subtitle: `${restaurant.cuisine} · ★ ${restaurant.rating}`,
      });
    }
  }, [restaurant, navigation]);

  if (!restaurant) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Restaurant not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const handleAdd = async (item: (typeof restaurant.menu)[0]) => {
    await addItem({
      itemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
    Alert.alert("Added", `${item.name} was added to your cart.`);
  };

  const listHeader = (
    <>
      <Image source={{ uri: restaurant.image }} style={styles.hero} contentFit="cover" />
      <Text style={styles.menuTitle}>Menu · {restaurant.menu.length} items</Text>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={restaurant.menu}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={listHeader}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MenuItemCard item={item} onAdd={() => handleAdd(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { width: "100%", height: 200, marginBottom: spacing.md },
  menuTitle: {
    ...text.h2,
    fontSize: 18,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { ...text.body },
  link: { ...text.bodyMedium, color: colors.primaryLight, marginTop: spacing.md },
});
