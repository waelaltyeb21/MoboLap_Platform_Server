import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";
import { useTranslations } from "next-intl";

const Questions = [
  "returnPolicy",
  "warranty",
  "howlong",
  "cahshOnDelivery",
  "installments",
  "guaranteed",
  "trackOrder",
];

const FAQ = () => {
  const t = useTranslations("Sections.FAQ");
  return (
    <article className="flex flex-col justify-center items-center my-8">
      <SectionHeading title={t("MainTitle")} subtitle={t("SubTitle")} />

      <div className="w-full md:lg:w-[50%] p-4 border rounded-lg">
        <Accordion type="single" collapsible>
          {Questions?.map((question) => (
            <AccordionItem key={question} value={`item-${question}`}>
              <AccordionTrigger className="text-[0.9rem] lg:text-lg font-medium focus-visible:text-indigo-600 underline-offset-4 hover:text-indigo-600 decoration-wavy [&[data-state=open]]:text-indigo-600 [&[data-state=open]]:underline">
                {t(`QuestionTitle.${question}`)}
              </AccordionTrigger>
              <AccordionContent>
                {t(`QuestionAnswer.${question}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </article>
  );
};

export default FAQ;
