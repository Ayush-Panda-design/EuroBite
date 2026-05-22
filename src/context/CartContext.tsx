import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
};

export type PlacedOrder = {
  orderId: string;
  placedAt: string;
  restaurantName: string;
  items: CartLine[];
  total: number;
};

const CART_KEY = "@foodapp/cart";
const ORDERS_KEY = "@foodapp/placed_orders";

type CartContextValue = {
  lines: CartLine[];
  placedOrders: PlacedOrder[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartLine, "lineId" | "quantity">) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  placeOrder: () => Promise<PlacedOrder | null>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);

  useEffect(() => {
    (async () => {
      const [cartRaw, ordersRaw] = await Promise.all([
        AsyncStorage.getItem(CART_KEY),
        AsyncStorage.getItem(ORDERS_KEY),
      ]);
      if (cartRaw) setLines(JSON.parse(cartRaw) as CartLine[]);
      if (ordersRaw) setPlacedOrders(JSON.parse(ordersRaw) as PlacedOrder[]);
    })();
  }, []);

  const persistCart = useCallback(async (next: CartLine[]) => {
    setLines(next);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(next));
  }, []);

  const persistOrders = useCallback(async (next: PlacedOrder[]) => {
    setPlacedOrders(next);
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  }, []);

  const addItem = useCallback(
    async (item: Omit<CartLine, "lineId" | "quantity">) => {
      const existing = lines.find((l) => l.itemId === item.itemId);
      if (existing) {
        const next = lines.map((l) =>
          l.itemId === item.itemId
            ? { ...l, quantity: l.quantity + 1 }
            : l,
        );
        await persistCart(next);
        return;
      }
      const line: CartLine = {
        ...item,
        lineId: `${item.itemId}-${Date.now()}`,
        quantity: 1,
      };
      await persistCart([...lines, line]);
    },
    [lines, persistCart],
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (quantity <= 0) {
        await persistCart(lines.filter((l) => l.lineId !== lineId));
        return;
      }
      await persistCart(
        lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l)),
      );
    },
    [lines, persistCart],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      await persistCart(lines.filter((l) => l.lineId !== lineId));
    },
    [lines, persistCart],
  );

  const clearCart = useCallback(async () => {
    await persistCart([]);
  }, [persistCart]);

  const placeOrder = useCallback(async () => {
    if (lines.length === 0) return null;
    const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
    const order: PlacedOrder = {
      orderId: `ORD-${Date.now()}`,
      placedAt: new Date().toISOString(),
      restaurantName: lines[0].restaurantName,
      items: [...lines],
      total,
    };
    const nextOrders = [order, ...placedOrders];
    await persistOrders(nextOrders);
    await clearCart();
    return order;
  }, [lines, placedOrders, persistOrders, clearCart]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      placedOrders,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeLine,
      clearCart,
      placeOrder,
    }),
    [
      lines,
      placedOrders,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeLine,
      clearCart,
      placeOrder,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
