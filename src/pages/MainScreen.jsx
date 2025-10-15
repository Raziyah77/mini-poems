import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MainScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = location.state?.theme || "life";

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://zenquotes.io/api/random`);
      const data = await response.json();

      if (data && data[0]) {
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } else {
        setQuote("No quote found.");
        setAuthor("Unknown");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote.");
      setAuthor("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [theme]);

  // Add current quote to favourites
  const addToFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const newFavourite = { quote, author };
    favourites.push(newFavourite);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert("Added to favourites!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Mini Poems - Theme: {theme}</h1>

      <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-lg text-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="text-xl italic mb-4">"{quote}"</p>
            <p className="text-sm text-gray-400 mb-6">— {author}</p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={addToFavourites}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
              >
                Add to Favourites
              </button>

              <button
                onClick={fetchQuote}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
              >
                Next
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Back to Landing Page
              </button>

              <button
                onClick={() => navigate("/favourites")}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
              >
                Go to Favourites
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainScreen;
