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
  return (
    <section>
      <article>
        <div className="grid grid-cols-3 gap-4">
          {Modes.map((mode) => (
            <div
              className="text-body cursor-pointer border-2 rounded-xl p-4 flex justify-center items-center my-4 hover:border-primary"
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
        onValueChange={(val) => ApperanceSettings.HandleSelectedTheme(val)}
        className="w-full m-8"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختار الثيم" />
        </SelectTrigger>
        <SelectContent className="capitalize">
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
