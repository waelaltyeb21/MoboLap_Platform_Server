import Product from "./Product";
import NotDataFound from "../NotDataFound";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductListAsAcards = ({ products }) => {
  return (
    products?.length != 0 && (
      <article className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </article>
    )
  );
};

const ProductPagination = () => {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const ProductList = ({ products }) => {
  return (
    <section>
      {/* Products List */}
      {/* If No Products Found */}
      <NotDataFound data={products} message="لا يوجد منتجات" />
      {/* If Products Found */}
      <ProductListAsAcards products={products} />
    </section>
  );
};

export default ProductList;
