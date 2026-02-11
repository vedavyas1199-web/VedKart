import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "./cartSlice";
import { Link } from "react-router-dom";


const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <h3>Your cart is empty 🛒</h3>;
  }

  return (
    <div style={{ padding: "16px" }}>
      <h2>Your Cart</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "16px",
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          <img src={item.image} alt={item.title} width="80" />

          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>

            <div>
              <button onClick={() => dispatch(decreaseQty(item.id))}>
                ➖
              </button>
              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>
              <button onClick={() => dispatch(increaseQty(item.id))}>
                ➕
              </button>
            </div>

            <button
              style={{ marginTop: "8px" }}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ₹ {total.toFixed(2)}</h3>
      <Link to="/checkout">
  <button style={{ marginTop: "20px" }}>Proceed to Payment</button>
</Link>
    </div>
  );
};

export default Cart;
