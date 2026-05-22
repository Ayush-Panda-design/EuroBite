import { Redirect, useLocalSearchParams } from "expo-router";

/** Deep link entry: foodapp://restaurant/123 */
export default function RestaurantDeepLink() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/(main)/restaurant/${id}`} />;
}
