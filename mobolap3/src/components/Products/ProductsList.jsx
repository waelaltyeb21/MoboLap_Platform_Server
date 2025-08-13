import React from "react";
import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";

const ProductsList = ({ data }) => {
  const t = useTranslations("Sections.Products");
  return (
    <section className="my-10">
      {data?.map((d) => (
        <div key={d?.category} className="not-last:mb-20">
          <h1 className="text-2xl font-semibold text-center mb-10">
            {t(d?.category)}
          </h1>
          <article className="">
            {d?.brands?.map((brand) => (
              <div key={brand?.name} className="mb-20">
                <h1 className="text-2xl font-semibold mb-16 text-center">
                  {t("productsFromBrand")}
                  {brand?.name}
                </h1>
                <article className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {brand?.products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </article>
              </div>
            ))}
          </article>
        </div>
      ))}
      {!data ||
        (data?.length === 0 && (
          <article
            className={`min-h-[50dvh] flex justify-center items-center gap-4`}
          >
            <h1 className="text-xl font-medium">{t("noProducts")}</h1>
          </article>
        ))}
    </section>
  );
};

export default ProductsList;
