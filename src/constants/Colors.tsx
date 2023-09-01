import React from "react";

export const COLORS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  success: "success",
  warning: "warning",
  danger: "danger",
  dark: "dark",
  medium: "medium",
  light: "light",
} as const;
export type Colors = keyof typeof COLORS;
