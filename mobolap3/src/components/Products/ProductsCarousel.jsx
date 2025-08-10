import React from "react";
import { CardCarousel } from "../ui/card-carousel";
import lofi from "../../../public/images/lofi1.jpeg";

const ProductsCarousel = () => {
  const images = [
    { src: lofi, alt: "Image 1" },
    { src: lofi, alt: "Image 2" },
    { src: lofi, alt: "Image 3" },
    { src: lofi, alt: "Image 4" },
    { src: lofi, alt: "Image 5" },
    { src: lofi, alt: "Image 6" },
    { src: lofi, alt: "Image 7" },
    { src: lofi, alt: "Image 8" },
  ];
  return (
    <article>
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </article>
  );
};

export default ProductsCarousel;
