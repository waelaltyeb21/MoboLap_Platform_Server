import React from "react";
import { Award, ReplaceAll, TruckElectric, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

const Features = [
  {
    title: "delivery",
    content:
      "نضمن لك توصيل طلبك في الوقت المحدد، سواء في المدينة أو المناطق البعيدة.",
    color: "text-blue-600",
    icon: TruckElectric,
  },
  {
    title: "ensurance",
    content: "جميع المنتجات تأتي مع ضمان طويل الأمد ضد العيوب.",
    color: "text-rose-600",
    icon: Award,
  },
  {
    title: "payment",
    content: "خيارات دفع متعددة وآمنة لتناسب احتياجاتك.",
    color: "text-green-600",
    icon: Wallet,
  },
  {
    title: "replacement",
    content: "خدمة استبدال وإرجاع سهلة في فترة محددة بعد الاستلام.",
    color: "text-teal-600",
    icon: ReplaceAll,
  },
];

const StoreFeatures = () => {
  const t = useTranslations("Features");
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-20">
      <div className="md:col-span-2 lg:col-span-4 mb-4">
        <h1 className="text-2xl text-center font-medium">مميزات المتجر</h1>
      </div>
      {Features?.map((Feature) => (
        <div
          key={Feature?.color}
          className={`font-medium border-[2px] ${Feature?.color} rounded-lg p-4 cursor-pointer hover:-translate-y-4 smooth-transition`}
        >
          <Feature.icon className={`${Feature?.color}`} />
          <h3 className={`text-2xl my-4 ${Feature?.color}`}>
            {t(`titles.${Feature?.title}`)}
          </h3>
          <p className="text-slate-500 dark:text-slate-200">
            {t(`contents.${Feature?.title}`)}
          </p>
        </div>
      ))}
    </section>
  );
};

export default StoreFeatures;
