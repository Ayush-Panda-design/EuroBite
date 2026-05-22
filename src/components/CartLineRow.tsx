import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CartLine } from "@/src/context/CartContext";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

type Props = {
  line: CartLine;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartLineRow({ line, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: line.image }} style={styles.image} contentFit="cover" />
      <View style={styles.body}>
        <Text style={styles.name}>{line.name}</Text>
        <Text style={styles.restaurant}>{line.restaurantName}</Text>
        <Text style={styles.price}>${(line.price * line.quantity).toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <Pressable style={styles.qtyBtn} onPress={onDecrease}>
            <Text style={styles.qtyText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{line.quantity}</Text>
          <Pressable style={styles.qtyBtn} onPress={onIncrease}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
          <Pressable onPress={onRemove} style={styles.remove}>
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 88, height: 88 },
  body: { flex: 1, padding: spacing.sm },
  name: { ...text.h3, fontSize: 15 },
  restaurant: { ...text.caption, marginTop: 2 },
  price: { ...text.price, marginTop: 4 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyText: { ...text.h3, fontSize: 18, color: colors.text },
  qty: { ...text.bodyMedium, minWidth: 20, textAlign: "center", color: colors.text },
  remove: { marginLeft: "auto" },
  removeText: { ...text.label, color: colors.danger, fontSize: 13 },
});
