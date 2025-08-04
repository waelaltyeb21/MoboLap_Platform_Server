import React from "react";
import { BlurFade } from "../magicui/blur-fade";
import Link from "next/link";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ShinyButton } from "../magicui/shiny-button";
import HeroImage from "../../../public/images/lofi1.jpeg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const hero = useTranslations("Sections.Hero");
  return (
    <section
      id="header"
      className="min-h-[70dvh] md:lg:min-h-[80dvh] grid grid-cols-12 gap-4 sm:mb-20"
    >
      <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center gap-4 text-center">
        <BlurFade delay={0.25} inView>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            {hero("MainTitle")}
          </h2>
        </BlurFade>

        <div className="md:lg:my-4 flex flex-col md:lg:gap-4">
          <BlurFade delay={0.25 * 2} inView>
            <span className="text-pretty text-lg tracking-tighter sm:text-3xl xl:text-4xl/none">
              {hero("SubTitle")}
            </span>
          </BlurFade>
          <BlurFade delay={0.25 * 4} inView>
            <span className="text-pretty text-lg tracking-tighter sm:text-3xl xl:text-4xl/none">
              <q className="text-indigo-600">
                <span className="px-4 text-foreground">{hero("slung")}</span>
              </q>
            </span>
          </BlurFade>
        </div>

        <BlurFade delay={0.25 * 6} inView>
          <Link href="/products">
            <ShinyButton className="flex items-center gap-2 rounded-lg">
              <AnimatedGradientText className="flex items-center gap-2 text-sm font-medium">
                <span className="text-lg tracking-tighter sm:text-lg xl:text-xl/none">
                  {hero("callToAction")}
                </span>
              </AnimatedGradientText>
            </ShinyButton>
          </Link>
        </BlurFade>
      </div>

      <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
        <div className="hidden sm:block w-[80%] h-[60%] relative">
          <div className="relative size-full overflow-hidden rounded-2xl">
            <Image
              src={HeroImage}
              alt="lofi"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="size-full object-cover rounded-2xl"
            />
          </div>

          <div className="absolute -left-20 bottom-16 font-medium animate-up-to-down bg-slate-100 p-2 rounded-xl">
            <span className="text-slate-900">{hero("Slungs.slung1")}</span>
          </div>
          <div className="absolute -right-20 top-48 font-medium animate-up-to-down bg-slate-100 p-2 rounded-xl">
            <span className="text-slate-900">{hero("Slungs.slung2")}</span>
          </div>
          <div className="absolute -left-20 top-8 font-medium animate-up-to-down bg-slate-100 p-2 rounded-xl">
            <span className="text-slate-900">{hero("Slungs.slung3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
