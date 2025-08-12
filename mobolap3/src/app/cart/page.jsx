import CartList from "@/components/Cart/CartList";
import CartProvider from "@/contexts/CartContext";
import GetData from "@/lib/GetData";

const Cart = async () => {
  const data = await GetData("/products");
  console.log("Products: ", data);
  return (
    <section>
      <CartProvider>
        <CartList products={data?.products} />
      </CartProvider>
    </section>
  );
};

export default Cart;
