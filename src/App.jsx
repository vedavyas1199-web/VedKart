import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./features/cart/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <>
      <Navbar />
      <ChatBot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </>
  );
}

export default App;
