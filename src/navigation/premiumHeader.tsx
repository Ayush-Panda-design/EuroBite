import type { ComponentProps } from "react";
import { PremiumHeader, type PremiumHeaderOptions } from "@/src/components/PremiumHeader";

export function createPremiumHeader(
  config?: string | PremiumHeaderOptions,
) {
  const resolved: PremiumHeaderOptions =
    typeof config === "string"
      ? { subtitle: config, showBrand: true }
      : { showBrand: true, ...config };

  return function PremiumHeaderWrapper(props: ComponentProps<typeof PremiumHeader>) {
    return (
      <PremiumHeader
        {...props}
        options={{ ...props.options, ...resolved }}
      />
    );
  };
}

export function createRestaurantHeader(subtitle?: string) {
  return function RestaurantHeaderWrapper(props: ComponentProps<typeof PremiumHeader>) {
    return (
      <PremiumHeader
        {...props}
        options={{
          ...props.options,
          subtitle,
          showBrand: true,
          headerIcon: "restaurant",
        }}
      />
    );
  };
}
