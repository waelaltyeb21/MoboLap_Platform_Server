import React from "react";
import { CardCarousel } from "./ui/card-carousel";
import img1 from "../../public/images/ASUS ROG Zephyrus G16.jpg";
import img2 from "../../public/images/S25-Ultra.webp";
import img3 from "../../public/images/iPhone 14 Pro Max.jpg";
import img4 from "../../public/images/Dell XPS 15.webp";
import img5 from "../../public/images/OnePlus 12.jpg";
import img6 from "../../public/images/MacBook Pro 14-inch (M3).webp";

const ProductsCarousel = () => {
  const images = [
    { src: img1, alt: "Image 1" },
    { src: img2, alt: "Image 2" },
    { src: img3, alt: "Image 3" },
    { src: img4, alt: "Image 4" },
    { src: img5, alt: "Image 5" },
    { src: img6, alt: "Image 6" },
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
