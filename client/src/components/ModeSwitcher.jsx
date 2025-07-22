"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCookie } from "cookies-next";

const ModeSwitcher = () => {
  const ModeHandler = (val) => {
    // Remove Current Mode
    document.documentElement.classList.remove("light", "dark");

    // Check The Default Mode In The Browser
    if (val === "system") {
      const isDarkMode = window.matchMedia("dark").matches;
      console.log("Mode ? ", isDarkMode ? "dark" : "light");
      setCookie("mode", isDarkMode ? "dark" : "light");
    } else {
      document.documentElement.classList.add(val);

      // Set To Cookies
      setCookie("mode", val);
    }
  };
  return (
    <article>
      <Select onValueChange={ModeHandler}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </article>
  );
};

export default ModeSwitcher;
