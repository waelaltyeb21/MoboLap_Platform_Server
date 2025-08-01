import React from "react";
import SectionHeading from "./SectionHeading";

const Steps = [
  {
    id: 1,
    step: "اختيار المنتجات",
    description:
      "اختر المنتجات التي ترغب بشرائها، واطّلع على المواصفات والتقييمات.",
  },
  {
    id: 2,
    step: "إضافة إلى سلة الطلبات",
    description:
      "أضف المنتجات المختارة إلى سلة التسوق لمتابعة عملية الطلب لاحقًا.",
  },
  {
    id: 3,
    step: "إكمال البيانات",
    description:
      "أدخل بيانات التوصيل مثل الاسم، العنوان، ورقم الهاتف بدقة لضمان سرعة التوصيل.",
  },
  {
    id: 4,
    step: "إرسال الطلب عبر واتساب",
    description:
      "اضغط على زر الطلب عبر واتساب لإرسال التفاصيل مباشرة إلى فريق الدعم وإتمام عملية الشراء بسهولة.",
  },
];

const HowItWorks = () => {
  return (
    <article className="How-It-Works my-20">
      <SectionHeading
        title="كيف تطلب من المتجر ؟"
        subtitle="خطوات بسيطة وسربعة وسلسة لطلب المنتجات من خلال المتجر"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Steps?.map((step) => (
          <div
            key={step?.id}
            className="relative flex flex-col items-center justify-center text-center border p-4 rounded-lg"
          >
            <h4 className="text-lg text-slate-100 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-700">
              {step?.id}
            </h4>
            <h1 className="my-4 text-xl">{step?.step}</h1>
            <p>{step?.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default HowItWorks;
