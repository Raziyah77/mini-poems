import { useState, useEffect } from "react";

function MainScreen({ theme }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      // FIXED: Use backticks for proper theme interpolation
      const response = await fetch(`http://localhost:5000/api/quote?theme=${theme}`);
      const data = await response.json();
      const mapped = {
        content: data.content || data.q || "No content",
        author: data.author || data.a || "Unknown"
      };

      // Add new quote to history only if different from last
      setHistory(prev => {
        if (prev.length === 0 || prev[prev.length - 1].content !== mapped.content) {
          return [...prev, mapped];
        }
        return prev;
      });

      setQuote(mapped);
      setIndex(prev => history.length); // show newest
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ content: "Could not fetch quote. Try again.", author: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (index < history.length - 1) {
      setQuote(history[index + 1]);
      setIndex(index + 1);
    } else {
      fetchQuote();
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setQuote(history[index - 1]);
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    setHistory([]); // reset history when theme changes
    setIndex(0);
    fetchQuote();
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-200 to-purple-300">
      <h2 className="text-2xl font-bold mb-4">Theme: {theme}</h2>

      <div className="bg-white text-black rounded-lg p-6 w-96 shadow-lg text-center">
        {loading ? (
          <p>Loading...</p>
        ) : quote ? (
          <>
            <p className="text-lg">{quote.content}</p>
            <p className="text-sm font-medium mt-2">— {quote.author}</p>
          </>
        ) : (
          <p>No quotes yet.</p>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className={`px-4 py-2 rounded-lg ${
            index === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MainScreen;
