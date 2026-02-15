require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

// Chat with LLM (Groq free tier) – streaming
app.post("/api/chat", async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY not set. Get a free key at https://console.groq.com" });
  }
  try {
    const { messages } = req.body;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a helpful, friendly assistant for an e-commerce app (Ved-Kart). Keep answers concise and helpful." },
          ...(messages || []),
        ],
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err || "Groq API error" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
      if (typeof res.flush === "function") res.flush();
    }
    res.end();
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Chat failed" });
  }
});

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