import ProductList from "../features/products/ProductList";

const Home = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ marginBottom: "16px" }}>All Products</h2>
      <ProductList />
    </div>
  );
};

export default Home;
