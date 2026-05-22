import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { MenuItem } from "@/src/constants/data";
import { colors, spacing } from "@/src/constants/theme";
import { text } from "@/src/constants/typography";

type Props = {
  item: MenuItem;
  onAdd: () => void;
};

export function MenuItemCard({ item, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
      <View style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Pressable style={styles.addBtn} onPress={onAdd}>
            <Text style={styles.addText}>Add</Text>
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
  image: { width: 100, height: 100 },
  body: { flex: 1, padding: spacing.sm, justifyContent: "center" },
  name: { ...text.h3 },
  desc: { ...text.caption, marginTop: 2, lineHeight: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  price: { ...text.price },
  addBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addText: { ...text.button, fontSize: 14 },
});
