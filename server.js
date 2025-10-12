import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// proxy route
app.get("/api/quote", async (req, res) => {
  const theme = req.query.theme || "life";

  try {
    const response = await fetch(`https://api.quotable.io/random?tags=${theme}`);
    const data = await response.json();

    // map API response to expected format
    const mapped = {
      content: data.content || "No content available.",
      author: data.author || "Unknown"
    };

    res.json(mapped);
  } catch (error) {
    console.error("Server error fetching quote:", error);

    // fallback quote
    res.json({
      content: "Could not fetch quote at this time. Please try again later.",
      author: "System"
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
