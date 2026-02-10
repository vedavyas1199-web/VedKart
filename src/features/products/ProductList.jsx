import { addToCart } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const dispatch = useDispatch();
<button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>;