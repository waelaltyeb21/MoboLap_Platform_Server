import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ProductSliders = ({ images }) => {
  const ENV =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
  const IMAGE_URL = `${ENV}/uploads/products`;
  return (
    <section>
      <div className="">
        <Carousel
          opts={{
            align: "end",
            loop: true,
          }}
          className="w-full max-w-xs"
          dir="ltr"
        >
          <CarouselContent className="p-">
            {images?.map((img) => (
              <CarouselItem key={img} className="relative">
                <Image
                  src={`${IMAGE_URL}/${img}`}
                  alt="image"
                  height={200}
                  width={200}
                  priority
                  className="size-full relative object-cover"
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
