import React from "react";
import ProductCard from "./ProductCard";

const Products = [
  // Mobiles
  {
    id: 1,
    category: "mobile",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 1199,
    specs: {
      screen: "6.1-inch OLED",
      storage: "256GB",
      ram: "8GB",
      camera: "48MP",
    },
  },
  {
    id: 2,
    category: "mobile",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1099,
    specs: {
      screen: "6.8-inch AMOLED",
      storage: "512GB",
      ram: "12GB",
      camera: "200MP",
    },
  },

  // Laptops
  {
    id: 3,
    category: "laptop",
    name: "MacBook Pro 16",
    brand: "Apple",
    price: 2499,
    specs: {
      screen: "16-inch Retina",
      storage: "1TB SSD",
      ram: "16GB",
      processor: "Apple M3 Pro",
    },
  },
  {
    id: 4,
    category: "laptop",
    name: "Dell XPS 15",
    brand: "Dell",
    price: 1899,
    specs: {
      screen: "15.6-inch 4K OLED",
      storage: "1TB SSD",
      ram: "32GB",
      processor: "Intel i9-13900H",
    },
  },
];

const ProductsList = () => {
  return (
    <section>
      {/* Heading */}
      {/* Products List */}
      <div className="mb-8">
        <h1 className="md:lg:text-right text-center text-3xl font-medium">
          منتجات سامسونج
        </h1>
      </div>
      <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {Products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </article>
    </section>
  );
};

export default ProductsList;
