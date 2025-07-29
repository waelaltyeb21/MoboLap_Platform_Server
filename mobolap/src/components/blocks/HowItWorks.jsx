import React from "react";
import { BorderBeam } from "../magicui/border-beam";

const Steps = [
  {
    id: 1,
    step: "تصفح المنتجات",
    description:
      "ابدأ بتصفح الهواتف واللابتوبات المتوفرة في متجر موبولاب حسب الفئة أو الماركة المفضلة لديك.",
  },
  {
    id: 2,
    step: "اختيار المنتجات",
    description:
      "اختر المنتجات التي ترغب بشرائها، واطّلع على المواصفات والتقييمات.",
  },
  {
    id: 3,
    step: "إضافة إلى سلة الطلبات",
    description:
      "أضف المنتجات المختارة إلى سلة التسوق لمتابعة عملية الطلب لاحقًا.",
  },
  {
    id: 4,
    step: "إكمال البيانات",
    description:
      "أدخل بيانات التوصيل مثل الاسم، العنوان، ورقم الهاتف بدقة لضمان سرعة التوصيل.",
  },
  {
    id: 5,
    step: "إرسال الطلب عبر واتساب",
    description:
      "اضغط على زر الطلب عبر واتساب لإرسال التفاصيل مباشرة إلى فريق الدعم وإتمام عملية الشراء بسهولة.",
  },
];

const HowItWorks = () => {
  return (
    <article className="How-It-Works grid md:grid-cols-2 lg:grid-cols-5 gap-4 my-20">
      {Steps?.map((step) => (
        <div
          key={step?.id}
          className="relative flex flex-col items-center justify-center text-center border p-4 rounded-lg"
        >
          <h4 className="text-lg w-8 h-8 flex items-center justify-center rounded-full bg-indigo-700">
            {step?.id}
          </h4>
          <h1 className="my-4 text-xl">{step?.step}</h1>
          <p>{step?.description}</p>
          <BorderBeam duration={5} size={100} />
        </div>
      ))}
    </article>
  );
};

export default HowItWorks;
