"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FONTSIZES, ApperanceSettings, FONTS } from "@/lib/apperance-settings";

export default function FontSwitcher() {
  return (
    <section className="grid grid-cols-2 gap-4">
      <Select
        dir="rtl"
        onValueChange={ApperanceSettings.HandleSelectedFontSize}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختار حجم الخط" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {FONTSIZES.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        dir="rtl"
        onValueChange={ApperanceSettings.HandleSelectedFontFamily}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="نوع الخط" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {FONTS.map((f) => (
            <SelectItem key={f} value={f}>
              {f}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
}
