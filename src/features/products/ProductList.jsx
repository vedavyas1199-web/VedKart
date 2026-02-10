import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice";
import { addToCart } from "../cart/cartSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Failed to load products</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}
    >
      {list.map((product) => (
        <div
          key={product.id}
          style={{ border: "1px solid #ccc", padding: "10px" }}
        >
          <img src={product.image} alt={product.title} width="100" />
          <h4>{product.title}</h4>
          <p>₹ {product.price}</p>

        <button
  onClick={() => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);

  }}
>
  Add to Cart
</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
