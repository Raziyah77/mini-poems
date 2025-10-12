import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// proxy route
app.get("/api/quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    res.json(data); // returns an array with {q, a}
  } catch (error) {
    console.error("Server error fetching quote:", error);
    res.status(500).json({ message: "Failed to fetch quote" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
