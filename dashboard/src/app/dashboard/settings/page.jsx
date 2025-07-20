import FontSwitcher from "@/components/FontSwitcher";
import ThemeColorSwitcher from "@/components/ThemeColorSwitcher";
import React from "react";

const Settings = () => {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-8">الإعدادات</h1>

      <div className="apperance">
        <h1 className="mb-4 font-semibold">التخصيص والمظهر</h1>
        <article className="grid gap-4">
          <ThemeColorSwitcher />
          <FontSwitcher />
        </article>
      </div>
    </section>
  );
};

export default Settings;
