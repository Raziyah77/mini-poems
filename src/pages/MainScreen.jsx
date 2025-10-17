import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MainScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state?.theme || "random";

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [favourites, setFavourites] = useState([]);

  
  const fetchQuote = async () => {
    try {
      console.log("🔍 Fetching quote from ZenQuotes API...");
      const response = await fetch("http://localhost:5000/api/quote");
      if (!response.ok) throw new Error("Failed to fetch quote");

      const data = await response.json();
      console.log("✅ Fetched data:", data);

      if (data && data.length > 0) {
        const newQuote = { q: data[0].q, a: data[0].a };

        
        setHistory((prev) => [...prev, newQuote]);
        setIndex((prev) => prev + 1);
        setQuote(newQuote.q);
        setAuthor(newQuote.a);
      } else {
        setQuote("No content available");
        setAuthor("Unknown");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setQuote("Could not fetch quote. Try again later.");
      setAuthor("Error");
    }
  };

  
  useEffect(() => {
    fetchQuote();
  }, [location]);

  // Navigation handlers
  const handleNext = () => {
    if (index < history.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuote(history[nextIndex].q);
      setAuthor(history[nextIndex].a);
    } else {
      fetchQuote();
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      setQuote(history[prevIndex].q);
      setAuthor(history[prevIndex].a);
    }
  };

  
  const addToFavourites = () => {
  
  const existing = JSON.parse(localStorage.getItem("favourites")) || [];

  
  const alreadyExists = existing.some((f) => f.q === quote && f.a === author);

  if (!alreadyExists) {
    const updated = [...existing, { q: quote, a: author }];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
    console.log("⭐ Added to favourites:", quote);
  } else {
    console.log("⚠️ Quote already in favourites:", quote);
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center px-6">
      <h2 className="text-2xl font-semibold mb-4">Theme: {theme}</h2>

      <p className="text-xl italic mb-2">"{quote}"</p>
      <p className="text-lg mb-6">— {author}</p>

      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          Next
        </button>
        <button
          onClick={addToFavourites}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg"
        >
          Add to Favourites
        </button>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/favourites")}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
        >
          Go to Favourites
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Back to Landing Page
        </button>
      </div>
    </div>
  );
}

export default MainScreen;

