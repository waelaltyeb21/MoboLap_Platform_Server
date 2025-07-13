// "use client"
// Fonts
const FONTS = ["cairo", "zain", "tajwal", "beiruti"];
const FONTSIZES = [
  {
    value: "--font-small",
    label: "خط صغير",
  },
  {
    value: "--font-medium",
    label: "خط متوسط",
  },
  {
    value: "--font-large",
    label: "خط كبير",
  },
];

// Themes
// const Themes = ["red", "green", "blue", "violet", "rose", "orange", "yellow"];
const Themes = [
  {
    value: "blue",
    label: "أزرق",
  },
  {
    value: "red",
    label: "أحمر",
  },
  {
    value: "green",
    label: "أخضر",
  },
  {
    value: "violet",
    label: "بنفسجي",
  },
  {
    value: "rose",
    label: "وردي",
  },
  {
    value: "orange",
    label: "برتقالي",
  },
  {
    value: "yellow",
    label: "أصفر",
  },
];

// Modes
const Modes = [
  { value: "light", label: "الوضع الفاتح" },
  { value: "dark", label: "الوضع الداكن" },
  { value: "system", label: "الوضع التلقائي" },
];

// Set font size variables based on the selected value
const FontMap = {
  "--font-small": {
    heading: "--font-medium",
    body: "--font-small",
    small: "--font-small",
    lineHeight: "1.2",
  },
  "--font-medium": {
    heading: "--font-large",
    body: "--font-normal",
    small: "--font-medium",
    lineHeight: "1.4",
  },
  "--font-large": {
    heading: "--font-xlarge",
    body: "--font-large",
    small: "--font-meduim",
    lineHeight: "1.8",
  },
};

const apperance = {
  fontFamily: "cairo",
  fontSize: "--font-medium",
  theme: "blue",
  mode: "light",
};

const ApperanceSettings = {
  // Fonts
  HandleSelectedFontFamily: (val) => {
    console.log("Font: ", val, `--font-${val}`);
    document.body.style.setProperty("--font-family", `var(--font-${val})`);
    // Store Font Family In LocalStorage
    apperance.fontFamily = val;
    localStorage.setItem("apperance", JSON.stringify(apperance));
  },
  HandleSelectedFontSize: (val) => {
    // Fallback to default sizes if the value is not in the map
    const fontSize = FontMap[val] || {
      heading: "--font-large",
      body: "--font-medium",
      small: "--font-small",
      lineHeight: "1.8",
    };

    // Apply the font sizes to the document body
    document.body.style.setProperty(
      "--font-heading",
      `var(${fontSize.heading})`
    );
    document.body.style.setProperty("--font-body", `var(${fontSize.body})`);
    document.body.style.setProperty("--font-small", `var(${fontSize.small})`);
    document.body.style.setProperty(
      "--line-height",
      `var(${fontSize.lineHeight})`
    );

    // Store the selected font size in localStorage
    apperance.fontSize = val;
    localStorage.setItem("apperance", JSON.stringify(apperance));
  },
  // Themes & Colors
  HandleSelectedTheme: (val) => {
    console.log("Val: ", val);
    Themes.forEach((theme) => {
      document.documentElement.classList.remove(theme.value);
    });
    document.documentElement.classList.add(val.value);

    // Store Theme In LocalStorage
    apperance.theme = val;
    localStorage.setItem("apperance", JSON.stringify(apperance));
  },
  HandleSelectedMode: (val) => {
    if (val === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(isDarkMode ? "dark" : "light");
    } else {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(val);
    }
    // Store Theme In LocalStorage
    apperance.mode = val ? "dark" : "light";
    localStorage.setItem("apperance", JSON.stringify(apperance));
  },
};

// const LoadApperanceSettings = () => {
//   // Load Apperance Settings from Local Storage
//   const apperance = JSON.parse(localStorage.getItem("apperance"));

//   // Set the font family, size, theme, and mode
//   ApperanceSettings.HandleSelectedFontFamily(apperance?.fontFamily || "cairo");
//   ApperanceSettings.HandleSelectedFontSize(
//     apperance?.fontSize || "--font-medium"
//   );
//   ApperanceSettings.HandleSelectedTheme(apperance?.theme || "blue");
//   ApperanceSettings.HandleSelectedMode(apperance?.mode || "light");
// };

module.exports = {
  FONTS,
  FONTSIZES,
  FontMap,
  Themes,
  Modes,
  ApperanceSettings,
  // LoadApperanceSettings,
};
