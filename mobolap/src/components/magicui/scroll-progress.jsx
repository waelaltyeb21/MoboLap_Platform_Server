"use client";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { motion, useScroll } from "motion/react";
import React from "react";

export const ScrollProgress = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();
    const locale = getCookie("NEXT_LOCALE") || "ar";
    // ("bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]");
    return (
      <motion.div
        ref={ref}
        className={cn(
          `fixed inset-x-0 top-0 z-50 h-[3px] rounded-br-full ${
            locale === "ar" ? "origin-left" : "origin-right"
          } bg-indigo-600`,
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";
