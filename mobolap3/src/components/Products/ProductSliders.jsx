import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const ProductSliders = ({ images }) => {
  const ENV =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
  const IMAGE_URL = `${ENV}/uploads/products`;

  return (
    <section className="lg:px-16 lg:pt-0 pt-8 flex justify-center">
      <div className="cursor-pointer max-w-4xl w-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "end",
            loop: true,
          }}
          className="w-full h-full"
          dir="ltr"
        >
          <CarouselContent className="w-full h-full">
            {images?.map((img) => (
              <CarouselItem key={img} className="relative">
                <Image
                  src={`${IMAGE_URL}/${img}`}
                  alt="image"
                  height={200}
                  width={200}
                  priority
                  className="size-full relative aspect-square overflow-hidden rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductSliders;
