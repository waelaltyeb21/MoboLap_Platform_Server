import React from "react";
import { CardCarousel } from "./ui/card-carousel";
import lofi1 from "../../public/images/lofi1.jpeg";
import lofi2 from "../../public/images/lofi2.jpeg";
import zoro1 from "../../public/images/zoro1.jpeg";

const ProductsCarousel = () => {
  const images = [
    { src: lofi1, alt: "Image 1" },
    { src: lofi2, alt: "Image 2" },
    { src: zoro1, alt: "Image 3" },
    { src: zoro1, alt: "Image 3" },
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
