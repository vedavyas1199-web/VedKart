import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./cartSlice";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    if (cartItems.length === 0) {
        return <div>Your cart is empty</div>;
    }
      return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
          <h4>{item.title}</h4>
          <p>₹ {item.price}</p>
          <p>Qty: {item.quantity}</p>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;