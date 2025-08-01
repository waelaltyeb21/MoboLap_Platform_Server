import React from "react";
import { BlurFade } from "../magicui/blur-fade";
import Link from "next/link";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ShinyButton } from "../magicui/shiny-button";
import HeroImage from "../../../public/images/lofi1.jpeg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="header"
      className="min-h-[70dvh] md:lg:min-h-[80dvh] grid grid-cols-12 gap-4 sm:mb-20"
    >
      <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center gap-4 text-center">
        <BlurFade delay={0.25} inView>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            مرحبًا بك في موبولاب!
          </h2>
        </BlurFade>

        <div className="md:lg:my-4 flex flex-col md:lg:gap-4">
          <BlurFade delay={0.25 * 2} inView>
            <span className="text-pretty text-lg tracking-tighter sm:text-3xl xl:text-4xl/none">
              اكتشف أحدث الهواتف واللابتوبات بأفضل الأسعار.
            </span>
          </BlurFade>
          <BlurFade delay={0.25 * 4} inView>
            <span className="text-pretty text-lg tracking-tighter sm:text-3xl xl:text-4xl/none">
              <q className="text-indigo-600">
                <span className="px-4 text-foreground">
                  التقنية بين يديك الآن , تسوّق بكل ثقة !
                </span>
              </q>
            </span>
          </BlurFade>
        </div>

        <BlurFade delay={0.25 * 6} inView>
          <Link href="/products">
            <ShinyButton className="flex items-center gap-2 rounded-lg">
              <AnimatedGradientText className="flex items-center gap-2 text-sm font-medium">
                {/* <ChevronRight
                  className="ml-1 size-4 stroke-neutral-500 transition-transform
duration-300 ease-in-out group-hover:translate-x-0.5"
                /> */}
                <span className="text-lg tracking-tighter sm:text-lg xl:text-xl/none">
                  تسوق الان
                </span>
              </AnimatedGradientText>
            </ShinyButton>
          </Link>
        </BlurFade>
      </div>

      <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
        <div className="hidden sm:block w-[80%] h-[60%] relative">
          <div className="size-full overflow-hidden rounded-2xl">
            <Image
              src={HeroImage}
              alt="lofi"
              fill
              className="size-full object-cover rounded-2xl"
            />
          </div>

          <div className="absolute -left-20 bottom-16 font-medium animate-up-to-down bg-slate-100 p-2 rounded-xl">
            <span className="text-slate-900">
              التقنية بين يديك الآن ✅
            </span>
          </div>
          <div className="absolute -right-20 top-48 font-medium animate-up-to-down bg-slate-100 p-2 rounded-xl">
            <span className="text-slate-900">
              تسوّق بكل ثقة❤️
            </span>
          </div>
          <div className="absolute -left-20 top-8 font-medium animate-up-to-down bg-slate-100 p-2 rounded-xl">
            <span className="text-slate-900">
              وجهتك الأولى للتقنية الحديثة 😍
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
