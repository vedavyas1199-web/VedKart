import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import checkout from "./pages/Checkout";
import Cart from "./features/cart/Cart";


function App() {
  return (
    <>    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/checkout" element={<Cart />} />
       </Routes>
       </>
  );
}

export default App;
