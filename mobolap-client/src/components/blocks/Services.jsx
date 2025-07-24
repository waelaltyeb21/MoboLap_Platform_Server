import {
  IconBrandCashapp,
  IconReplace,
  IconRosetteDiscountCheckFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";
import React from "react";

const StoreServices = [
  {
    title: "خدمة توصيل",
    content:
      "نضمن لك توصيل طلبك في الوقت المحدد، سواء في المدينة أو المناطق البعيدة.",
    color: "text-blue-600",
    icon: IconTruckDelivery,
  },
  {
    title: "ضمان المنتجات",
    content: "جميع المنتجات تأتي مع ضمان طويل الأمد ضد العيوب.",
    color: "text-rose-600",
    icon: IconRosetteDiscountCheckFilled,
  },
  {
    title: "دفع آمن ومرن",
    content: "خيارات دفع متعددة وآمنة لتناسب احتياجاتك.",
    color: "text-green-600",
    icon: IconBrandCashapp,
  },
  {
    title: "الاستبدال والإرجاع",
    content: "خدمة استبدال وإرجاع سهلة في فترة محددة بعد الاستلام.",
    color: "text-teal-600",
    icon: IconReplace,
  },
];

const Services = () => {
  return (
    <article className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
      {StoreServices?.map((service) => (
        <div
          key={service?.title}
          className={`border border-slate-300 p-4 rounded-lg hover:shadow-lg transition-all`}
        >
          <service.icon className={`${service?.color}`} />
          <h3 className={`text-2xl font-semibold my-2 ${service?.color}`}>
            {service?.title}
          </h3>
          <p className="text-slate-800">{service?.content}</p>
        </div>
      ))}
    </article>
  );
};

export default Services;
