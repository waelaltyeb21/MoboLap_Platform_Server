"use client";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { motion, useScroll } from "motion/react";
import React, { useEffect, useState } from "react";

export const ScrollProgress = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();
    const [ShowBar, setShowBar] = useState(true);
    const locale = getCookie("NEXT_LOCALE") || "ar";

    useEffect(() => {
      const unsubscribe = scrollYProgress.on("change", (v) => {
        if (v >= 0.999) {
          setShowBar(false);
        } else {
          setShowBar(true);
        }
      });

      return () => unsubscribe();
    }, [scrollYProgress]);

    return (
      <motion.div
        ref={ref}
        className={cn(
          `${
            ShowBar ? "block" : "hidden"
          } fixed inset-x-0 top-0 z-50 h-[3px] rounded-br-full ${
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
