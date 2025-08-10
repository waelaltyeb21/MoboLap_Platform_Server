import CartList from "@/components/Cart/CartList";
import CartProvider from "@/contexts/CartContext";

const Cart = () => {
  return (
    <section>
      <CartProvider>
        <CartList />
      </CartProvider>
    </section>
  );
};

export default Cart;
