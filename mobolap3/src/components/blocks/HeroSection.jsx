import React from "react";
import { BlurFade } from "../magicui/blur-fade";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const HeroSection = () => {
  const hero = useTranslations("Sections.Hero");
  return (
    <section
      id="header"
      className="min-h-[50dvh] md:lg:min-h-[60dvh] flex items-center justify-center sm:mb-20"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <BlurFade delay={0.25} inView>
          <h2 className="text-3xl text-indigo-600 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
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
            <Button className="cursor-pointer text-lg  tracking-tighter sm:text-lg xl:text-xl/none">
              {hero("callToAction")}
            </Button>
          </Link>
        </BlurFade>
      </div>
    </section>
  );
};

export default HeroSection;
