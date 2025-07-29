import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Questions = [
  {
    id: 1,
    theQuestion: "ما هي سياسة الاسترجاع لديكم؟",
    content:
      "يمكنك استرجاع المنتج خلال 14 يومًا من تاريخ الاستلام، بشرط أن يكون بحالته الأصلية مع الفاتورة.",
  },
  {
    id: 2,
    theQuestion: "هل توفرون ضمان على الهواتف واللابتوبات؟",
    content:
      "نعم، جميع المنتجات تأتي مع ضمان لمدة عام على الأقل ضد عيوب التصنيع.",
  },
  {
    id: 3,
    theQuestion: "كم يستغرق توصيل الطلب؟",
    content: "يتم التوصيل خلال 2 إلى 5 أيام عمل داخل الدولة، حسب المنطقة.",
  },
  {
    id: 4,
    theQuestion: "هل يمكنني الدفع عند الاستلام؟",
    content:
      "نعم، نوفر خيار الدفع عند الاستلام في بعض المدن، ويمكنك التحقق من ذلك عند إتمام الطلب.",
  },
  {
    id: 5,
    theQuestion: "هل أستطيع تقسيط سعر الهاتف أو اللابتوب؟",
    content:
      "نوفر خيارات تقسيط ميسرة عبر شركائنا البنكيين، يمكنك الاطلاع عليها أثناء عملية الشراء.",
  },
  {
    id: 6,
    theQuestion: "هل الأجهزة أصلية ومضمونة؟",
    content:
      "نعم، نبيع أجهزة أصلية 100٪ من الوكلاء المعتمدين ومرفقة بشهادة ضمان.",
  },
  {
    id: 7,
    theQuestion: "كيف يمكنني تتبع طلبي؟",
    content:
      "بمجرد شحن الطلب، ستتلقى رسالة نصية أو بريد إلكتروني يحتوي على رقم التتبع والرابط.",
  },
];

const FAQ = () => {
  return (
    <article className="flex flex-col justify-center items-center gap-8 my-8">
      <div className="text-center">
        <h1 className="text-3xl font-medium mb-2">
          <q className="text-indigo-600">
            <span className="px-4 text-foreground">
              الاسئلة الشائعة عن المتجر
            </span>
          </q>
        </h1>
        <p>
          هنا ستجد إجابات عن أكثر الأسئلة المتكررة حول منتجاتنا، الشحن، الضمان،
          وسياسات الدفع والاسترجاع
        </p>
      </div>
      <div className="md:lg:w-[80%]">
        <Accordion type="single" collapsible className="p-4 border rounded-lg">
          {Questions?.map((question) => (
            <AccordionItem key={question?.id} value={`item-${question?.id}`}>
              <AccordionTrigger className="text-lg font-medium focus-visible:text-indigo-600 underline-offset-4 hover:text-indigo-600 decoration-wavy [&[data-state=open]]:text-indigo-600 [&[data-state=open]]:underline">
                {question?.theQuestion}
              </AccordionTrigger>
              <AccordionContent>{question?.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </article>
  );
};

export default FAQ;
