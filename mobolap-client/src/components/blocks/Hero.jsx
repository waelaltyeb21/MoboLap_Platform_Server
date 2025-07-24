import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[50dvh] min-w-full flex justify-center items-center rounded-lg overflow-hidden mb-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">مرحبًا بك في متجر موبولاب!</h1>
        <p className="w-[50%] text-center">
          اكتشف أحدث وأفضل المنتجات التقنية التي تناسب جميع احتياجاتك، من
          الهواتف الذكية إلى الإكسسوارات والأجهزة الإلكترونية المبتكرة. في
          موبولاب، نقدم لك تجربة تسوق فريدة تضمن لك الجودة العالية والأسعار
          المنافسة. هل أنت مستعد للانطلاق؟ تصفح مجموعتنا الآن واكتشف العروض
          الحصرية!
        </p>
        <Button variant="filled" component={Link} href="/products">
          تسوق الآن
        </Button>
      </div>
    </section>
  );
};

export default Hero;
