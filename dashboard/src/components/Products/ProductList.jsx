import Product from "./Product";
import NotDataFound from "../NotDataFound";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { NumberFormat } from "@/lib/NumberFormat";
import Image from "next/image";

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

const ProductListAsTable = ({ products }) => {
  const IMAGE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/images/products/`;
  return (
    products?.length !== 0 && (
      <Table className="border">
        <TableHeader className="*:text-right *:border">
          <TableHead>#</TableHead>
          <TableHead>صورة المنتج</TableHead>
          <TableHead>اسم المنتج</TableHead>
          <TableHead>سعر المنتج</TableHead>
          <TableHead>التخفيض</TableHead>
          <TableHead>قيمة التخفيض</TableHead>
          <TableHead>السعر المخفض</TableHead>
          <TableHead>المواصفات</TableHead>
          <TableHead>قسم المنتج</TableHead>
          <TableHead>المورد</TableHead>
          <TableHead>حالة المنتج</TableHead>
          <TableHead>تاريخ الاضافة</TableHead>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product?._id} className="*:text-right *:border-s">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={`${IMAGE_URL}${product?.image}`}
                  priority
                  width={20}
                  height={20}
                  className="w-auto h-auto"
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{NumberFormat(product?.price)}</TableCell>
              <TableCell>{`${product?.discount}%`}</TableCell>
              <TableCell>
                {NumberFormat(product?.price * (product?.discount / 100))}
              </TableCell>
              <TableCell>
                {NumberFormat(
                  product?.price - product?.price * (product?.discount / 100)
                )}
              </TableCell>
              <TableCell>
                {Object.values(product?.specs)?.map((spec) => (
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span key={spec}>{spec}</span>
                  </div>
                ))}
              </TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell>{product?.supplier}</TableCell>
              <TableCell>{product?.isAvailable}</TableCell>
              <TableCell>{product?.createdAt?.split("T")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
};

const ProductList = ({ products }) => {
  const isTable = true;
  return (
    <section>
      {/* Products List */}
      <article>
        {/* If No Products Found */}
        <NotDataFound data={products} message="لا يوجد منتجات" />
        {/* If Products Found */}
        {isTable ? (
          <ProductListAsTable products={products} />
        ) : (
          <ProductListAsAcards products={products} />
        )}
      </article>
    </section>
  );
};

export default ProductList;
