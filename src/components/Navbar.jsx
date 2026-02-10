import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector(
    (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/checkout">Cart</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
