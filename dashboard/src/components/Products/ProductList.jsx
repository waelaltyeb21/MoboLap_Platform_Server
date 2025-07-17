import Heading from "../Heading";
import MoboButton from "../ui/MoboButton";
import ProductsFilter from "./ProductsFilter";
import Product from "./Product";
import Link from "next/link";
import NotDataFound from "../NotDataFound";

const ProductList = ({ products }) => {
  return (
    <section>
      {/* Products List */}
      <article>
        <Heading title="المنتجات">
          <MoboButton>
            <Link href="/dashboard/products/create">اضافة منتج</Link>
          </MoboButton>
        </Heading>
        {/* If No Products Found */}
        <NotDataFound data={products} message="لا يوجد منتجات" />
        {/* If Products Found */}
        {products?.length != 0 && (
          <>
            <ProductsFilter products={products} />
            <article className="grid grid-cols-4 gap-4">
              {products?.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </article>
          </>
        )}
      </article>
    </section>
  );
};

export default ProductList;
