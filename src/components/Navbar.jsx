import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart.items);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#2874f0", // Flipkart blue 😄
        color: "white",
      }}
    >
      {/* LEFT: Brand Name */}
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
          textDecoration: "none",
        }}
      >
        Ved-Kart
      </Link>

      {/* RIGHT: Links */}
      <div>
        <Link
          to="/cart"
          style={{ color: "white", marginRight: "20px" }}
        >
          Cart 🛒 {totalQty > 0 && `(${totalQty})`}
        </Link>

        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
