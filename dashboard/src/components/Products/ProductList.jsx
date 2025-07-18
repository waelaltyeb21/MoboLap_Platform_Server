import Product from "./Product";
import NotDataFound from "../NotDataFound";

const ProductList = ({ products }) => {
  return (
    <section>
      {/* Products List */}
      <article>
        {/* If No Products Found */}
        <NotDataFound data={products} message="لا يوجد منتجات" />
        {/* If Products Found */}
        {products?.length != 0 && (
          <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </article>
        )}
      </article>
    </section>
  );
};

export default ProductList;
