"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FONTSIZES, ApperanceSettings, FONTS } from "@/lib/apperance-settings";

export default function FontSwitcher() {
  useEffect(() => {
    const fontSize =
      JSON.parse(localStorage.getItem("apperance"))?.fontSize ||
      "--font-medium";
    // Set the font
    console.log("Font Size: ", fontSize);
    ApperanceSettings.HandleSelectedFontSize(fontSize);
  });

  return (
    <section>
      {/* <Select
        onValueChange={ApperanceSettings.HandleSelectedFontSize}
        className="my-20"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"Select Font Size"} />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {FONTSIZES.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <article>
        <div className="grid grid-cols-3 gap-4">
          {FONTSIZES.map((font) => (
            <div
              className="cursor-pointer border-2 rounded-xl p-4 flex justify-center items-center my-4 hover:border-primary"
              key={font.value}
              onClick={() =>
                ApperanceSettings.HandleSelectedFontSize(font.value)
              }
            >
              <h1 className="font-semibold">{font.label}</h1>
            </div>
          ))}
        </div>
      </article>
      {/* <Select
        onValueChange={ApperanceSettings.HandleSelectedFontFamily}
        className="w-full m-8"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"Select Font"} />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {FONTS.map((f) => (
            <SelectItem key={f} value={f}>
              {f}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </section>
  );
}
