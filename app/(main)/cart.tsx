import { router } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CartLineRow } from "@/src/components/CartLineRow";
import { useCart } from "@/src/context/CartContext";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

export default function CartScreen() {
  const { lines, subtotal, updateQuantity, removeLine, placeOrder } = useCart();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const footerPad = Math.max(insets.bottom, 16) + spacing.md;

  const handleCheckout = async () => {
    if (lines.length === 0) {
      Alert.alert("Empty cart", "Add items from a restaurant menu first.");
      return;
    }
    setLoading(true);
    try {
      const order = await placeOrder();
      if (order) {
        Alert.alert(
          "Order placed!",
          `Your order ${order.orderId} from ${order.restaurantName} is on its way.`,
          [
            {
              text: "View orders",
              onPress: () => router.replace("/(main)/(tabs)/orders"),
            },
          ],
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (lines.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Browse restaurants and add your favorite dishes.</Text>
        <Pressable style={styles.button} onPress={() => router.replace("/(main)/(tabs)")}>
          <Text style={styles.buttonText}>Browse restaurants</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lines}
        keyExtractor={(l) => l.lineId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartLineRow
            line={item}
            onIncrease={() => updateQuantity(item.lineId, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.lineId, item.quantity - 1)}
            onRemove={() => removeLine(item.lineId)}
          />
        )}
      />
      <View style={[styles.footer, { paddingBottom: footerPad }]}>
        <Text style={styles.total}>Total: ${subtotal.toFixed(2)}</Text>
        <Pressable style={styles.button} onPress={handleCheckout} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={styles.buttonText}>Place order</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md, paddingBottom: 120 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  total: { ...text.h2, marginBottom: spacing.md },
  button: {
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { ...text.button },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyTitle: { ...text.h2, textAlign: "center" },
  emptyText: { ...text.body, textAlign: "center", marginTop: spacing.sm },
});
