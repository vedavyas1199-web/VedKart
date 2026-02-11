const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_SEoCQcayO5FxMM", // your test key id
      key_secret: "9MHxZEcH654utv5PEupFVL1K", // your test secret
    });

    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
//node server.js