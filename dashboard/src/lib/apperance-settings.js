// "use client"

const { getCookie, setCookie } = require("cookies-next");
const { cookies } = require("next/headers");

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
const Themes = [
  {
    value: "blue",
    label: "أزرق",
    color: "bg-blue-500",
  },
  {
    value: "red",
    label: "أحمر",
    color: "bg-red-500",
  },
  {
    value: "green",
    label: "أخضر",
    color: "bg-green-500",
  },
  {
    value: "violet",
    label: "بنفسجي",
    color: "bg-purple-500",
  },
  {
    value: "rose",
    label: "وردي",
    color: "bg-rose-500",
  },
  {
    value: "orange",
    label: "برتقالي",
    color: "bg-orange-500",
  },
  {
    value: "yellow",
    label: "أصفر",
    color: "bg-yellow-500",
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

// Save Apperance To Cookies
const SaveApperanceToCookies = async (val) => {
  try {
    const StoredApperance = getCookie("apperance");
    const apperance = StoredApperance ? JSON.parse(StoredApperance) : {};
    setCookie("apperance", JSON.stringify({ ...apperance, ...val }));
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(error);
  }
};

// Modify Apperance
const ApperanceSettings = {
  // Fonts
  HandleSelectedFontFamily: (val) => {
    document.body.style.setProperty("--font-family", `var(--font-${val})`);
    // Store Font Family In LocalStorage
    SaveApperanceToCookies({ fontFamily: `var(--font-${val})` });
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

    // Store Font Size
    SaveApperanceToCookies({ fontSize: val });
  },
  // Themes & Colors
  HandleSelectedTheme: async (val) => {
    Themes.forEach((theme) => {
      document.documentElement.classList.remove(theme.value);
    });
    document.documentElement.classList.add(val.value);

    // Store Theme
    apperance.theme = val;
    console.log("Theme: ", val);
    SaveApperanceToCookies(apperance);
  },
  HandleSelectedMode: (val) => {
    if (val.value === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(isDarkMode ? "dark" : "light");
    } else {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(val.value);
    }
    // Store Mode
    SaveApperanceToCookies({ mode: val });
  },
};

// Load Apperance From Cookies
const LoadApperanceSettings = async () => {
  const AppCookies = await cookies();
  const isFirstLog = AppCookies.get("apperance") === undefined;
  let apperance;

  if (isFirstLog) {
    console.log("This is the first log");
    apperance = {
      fontFamily: "zain",
      fontSize: "--font-medium",
      theme: {
        value: "blue",
        label: "أزرق",
      },
      mode: { value: "light", label: "الوضع الفاتح" },
    };
    // setCookie("apperance", JSON.stringify(apperance))
  } else {
    console.log("This is not the first log");
    apperance = JSON.parse(AppCookies.get("apperance")?.value);
  }

  // Apply the font sizes to the document body
  const fontSize = FontMap[apperance.fontSize] || {
    heading: "--font-large",
    body: "--font-medium",
    small: "--font-small",
    lineHeight: "1.8",
  };
  return {
    theme: apperance?.theme?.value || "blue",
    mode: apperance?.mode?.value,
    fontFamily: apperance?.fontFamily || "cairo",
    fontSize: fontSize,
  };
};

module.exports = {
  FONTS,
  FONTSIZES,
  FontMap,
  Themes,
  Modes,
  ApperanceSettings,
  LoadApperanceSettings,
};
