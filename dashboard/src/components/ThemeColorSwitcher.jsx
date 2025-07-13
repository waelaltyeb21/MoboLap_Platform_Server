"use client";
import { Select } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ApperanceSettings, Modes, Themes } from "@/lib/apperance-settings";

export default function ThemeColorSwitcher() {
  const [mode, setMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState({
    value: "blue",
    label: "أزرق",
  });

  useEffect(() => {
    // Load Theme From Local Storage
    const apperance = JSON.parse(localStorage.getItem("apperance"));
    const darkTheme = apperance.mode || "light";
    const selectedTheme = apperance.theme || {
      value: "blue",
      label: "أزرق",
    };

    setMode(darkTheme === "dark");
    setSelectedTheme(selectedTheme);

    console.log("Dark Theme:", darkTheme, darkTheme === "dark");
    console.log("Selected Theme:", selectedTheme);

    // Set Theme
    document.documentElement.classList.add(darkTheme);
    document.documentElement.classList.add(selectedTheme.value);
  });

  return (
    <section>
      <article>
        <div className="grid grid-cols-3 gap-4">
          {Modes.map((mode) => (
            <div
              className="cursor-pointer border-2 rounded-xl p-4 flex justify-center items-center my-4 hover:border-primary"
              key={mode.value}
              onClick={() => ApperanceSettings.HandleSelectedMode(mode.value)}
            >
              <h1 className="font-semibold">{mode.label}</h1>
            </div>
          ))}
        </div>
      </article>
      <Select
        dir="rtl"
        defaultValue={selectedTheme.value}
        onValueChange={(val) => ApperanceSettings.HandleSelectedTheme(val)}
        className="w-full m-8"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختار الثيم" />
        </SelectTrigger>
        <SelectContent defaultValue={selectedTheme} className="capitalize">
          {Themes.map((theme) => (
            <SelectItem key={theme.value} value={theme}>
              {theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
}
