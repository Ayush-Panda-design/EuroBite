import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/src/context/CartContext";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function MyOrdersScreen() {
  const { placedOrders } = useCart();

  if (placedOrders.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptyText}>Your completed orders will show up here.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={placedOrders}
      keyExtractor={(o) => o.orderId}
      contentContainerStyle={styles.content}
      renderItem={({ item: order }) => (
        <View style={styles.card}>
          <Text style={styles.orderId}>{order.orderId}</Text>
          <Text style={styles.rest}>{order.restaurantName}</Text>
          <Text style={styles.meta}>
            {new Date(order.placedAt).toLocaleDateString()} · ${order.total.toFixed(2)}
          </Text>
          {order.items.map((line) => (
            <View key={line.lineId} style={styles.line}>
              <Image source={{ uri: line.image }} style={styles.thumb} contentFit="cover" />
              <Text style={styles.lineName}>
                {line.name} × {line.quantity}
              </Text>
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  empty: { flex: 1, justifyContent: "center", padding: spacing.xl },
  emptyTitle: { ...text.h2, textAlign: "center" },
  emptyText: { ...text.body, textAlign: "center", marginTop: 8 },
  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 14,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderId: { ...text.caption, fontSize: 12 },
  rest: { ...text.h2, fontSize: 18, marginTop: 4 },
  meta: { ...text.caption, marginBottom: spacing.sm },
  line: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  thumb: { width: 36, height: 36, borderRadius: 6 },
  lineName: { ...text.bodyMedium, color: colors.text },
});
