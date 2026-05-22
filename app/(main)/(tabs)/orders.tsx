import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CartLineRow } from "@/src/components/CartLineRow";
import { useCart } from "@/src/context/CartContext";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function OrdersScreen() {
  const { lines, placedOrders, subtotal, updateQuantity, removeLine } = useCart();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.section}>Your cart</Text>
      {lines.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty. Add dishes from a restaurant menu.</Text>
      ) : (
        <>
          {lines.map((item) => (
            <CartLineRow
              key={item.lineId}
              line={item}
              onIncrease={() => updateQuantity(item.lineId, item.quantity + 1)}
              onDecrease={() => updateQuantity(item.lineId, item.quantity - 1)}
              onRemove={() => removeLine(item.lineId)}
            />
          ))}
          <Text style={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Pressable style={styles.checkout} onPress={() => router.push("/(main)/cart")}>
            <Text style={styles.checkoutText}>Go to checkout</Text>
          </Pressable>
        </>
      )}

      <Text style={[styles.section, styles.historyTitle]}>Order history</Text>
      {placedOrders.length === 0 ? (
        <Text style={styles.empty}>No past orders yet.</Text>
      ) : (
        placedOrders.map((order) => (
          <View key={order.orderId} style={styles.orderCard}>
            <Text style={styles.orderId}>{order.orderId}</Text>
            <Text style={styles.orderRest}>{order.restaurantName}</Text>
            <Text style={styles.orderMeta}>
              {order.items.length} items · ${order.total.toFixed(2)}
            </Text>
            <View style={styles.thumbs}>
              {order.items.slice(0, 3).map((line) => (
                <Image
                  key={line.lineId}
                  source={{ uri: line.image }}
                  style={styles.thumb}
                  contentFit="cover"
                />
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  section: { ...text.h2 },
  historyTitle: { marginTop: spacing.xl },
  empty: { ...text.body, marginTop: spacing.md },
  subtotal: { ...text.h2, fontSize: 18, marginTop: spacing.sm, color: colors.text },
  checkout: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  checkoutText: { ...text.button, fontSize: 16 },
  orderCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderId: { ...text.caption, fontSize: 12 },
  orderRest: { ...text.h3, marginTop: 4 },
  orderMeta: { ...text.caption, marginTop: 4 },
  thumbs: { flexDirection: "row", gap: 6, marginTop: spacing.sm },
  thumb: { width: 40, height: 40, borderRadius: 6 },
});
