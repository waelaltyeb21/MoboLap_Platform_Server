"use client";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ApperanceSettings, Modes, Themes } from "@/lib/apperance-settings";

export const ThemeSwitcher = () => {
  return (
    <article>
      <Select
        dir="rtl"
        onValueChange={(val) => ApperanceSettings.HandleSelectedTheme(val)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="نوع الثيم" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {Themes.map((theme) => (
            <SelectItem key={theme.value} value={theme}>
              <div className={`w-4 h-4 rounded-full ${theme.color}`}></div>
              <span>{theme.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </article>
  );
};

export const ModeSwithcer = () => {
  return (
    <article>
      <Select
        dir="rtl"
        onValueChange={(val) => ApperanceSettings.HandleSelectedMode(val)}
      >
        <SelectTrigger className="w-full ">
          <SelectValue
            placeholder="نوع الوضع"
            className="placeholder:font-semibold"
          />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {Modes.map((mode) => (
            <SelectItem key={mode.value} value={mode}>
              {mode.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </article>
  );
};

export default function ThemeColorSwitcher() {
  return (
    <section className="grid grid-cols-2 gap-4">
      <ThemeSwitcher />
      <ModeSwithcer />
    </section>
  );
}
