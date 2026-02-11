import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {const total = useSelector((state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const handlePayment = () => {
  const options = {
    key: "rzp_test_SEoCQcayO5FxMM",
    amount: total * 100, // convert to paise
    currency: "INR",
    name: "VedKart",
    description: "VedKart Checkout",
    handler: (response) => {
      alert("Payment successful! ID: " + response.razorpay_payment_id);
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};
  return (
    <div style={{ padding: 30 }}>
      <h2>Checkout Page</h2>
      <button onClick={handlePayment}>Pay ₹{total}</button>
    </div>
  );
};

export default Checkout;
