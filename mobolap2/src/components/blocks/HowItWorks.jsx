import React from "react";
import SectionHeading from "./SectionHeading";
import { useTranslations } from "next-intl";

const Steps = [
  {
    id: 1,
    step: "SelectProducts",
    description: "SelectProducts",
  },
  {
    id: 2,
    step: "AddToCart",
    description: "AddToCart",
  },
  {
    id: 3,
    step: "FillTheForm",
    description: "FillTheForm",
  },
  {
    id: 4,
    step: "SendViaWhatsapp",
    description: "SendViaWhatsapp",
  },
];

const HowItWorks = () => {
  const t = useTranslations("Sections.HowItWorks");
  return (
    <article className="How-It-Works my-20">
      <SectionHeading title={t("MainTitle")} subtitle={t("SubTitle")} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Steps?.map((step) => (
          <div
            key={step?._id}
            className="relative flex flex-col items-center justify-center text-center border p-4 rounded-lg"
          >
            <h4 className="text-lg text-slate-100 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-700">
              {step?._id}
            </h4>
            <h1 className="my-4 text-xl">{t(`StepsTitles.${step?.step}`)}</h1>
            <p>{t(`StepsContent.${step?.description}`)}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default HowItWorks;
