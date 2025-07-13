import React from "react";
import { Button } from "./button";

export default function MoboButton({
  handler = null,
  className = "",
  variant = "",
  color = "",
  children = null,
  loading = false,
}) {
  return (
    <Button
      onClick={handler}
      className={className}
      variant={variant}
      color={color}
      disabled={loading}
    >
      {children}
    </Button>
  );
}
