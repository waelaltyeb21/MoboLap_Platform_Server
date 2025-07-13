import FontSwitcher from "@/components/FontSwitcher";
import ThemeColorSwitcher from "@/components/ThemeColorSwitcher";

export default function Home() {
  return (
    <section className="p-20">
      <h1 className="text-primary text-body">Wael Altyeb</h1>
      <h1 className="text-primary text-body">وائل الطيب</h1>
      <ThemeColorSwitcher />
      <FontSwitcher />
    </section>
  );
}
