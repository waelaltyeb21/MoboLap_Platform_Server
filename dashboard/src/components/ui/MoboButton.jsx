import React from "react";
import { Button } from "./button";

export default function MoboButton({
  handler = null,
  className = "",
  variant = "",
  children = null,
  loading = false,
  ...props
}) {
  return (
    <Button
      onClick={handler}
      className={`${className} dark:text-white font-semibold cursor-pointer`}
      variant={variant}
      disabled={loading}
      {...props}
    >
      {children}
    </Button>
  );
}
