import { useState, useEffect } from "react";

function MainScreen({ theme }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/quote");
      const data = await response.json();

      // ZenQuotes returns array with {q, a}
      const quoteObj = data[0];
      const mapped = { content: quoteObj.q, author: quoteObj.a };

      setHistory((prev) => [...prev, mapped]);
      setIndex((prev) => prev + 1);
      setQuote(mapped);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({ content: "Could not fetch quote. Try again.", author: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (index < history.length) {
      setQuote(history[index]);
      setIndex(index + 1);
    } else {
      fetchQuote();
    }
  };

  const handlePrev = () => {
    if (index > 1) {
      setQuote(history[index - 2]);
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-200 to-purple-200">
      <h2 className="text-2xl font-bold mb-4">Theme: {theme}</h2>

      <div className="bg-white text-black rounded-lg p-6 w-96 shadow-lg text-center">
        {loading ? (
          <p>Loading...</p>
        ) : quote ? (
          <>
            <p className="text-lg font-semibold mb-2">{quote.content}</p>
            <p className="text-sm font-medium">— {quote.author || "Unknown"}</p>
          </>
        ) : (
          <p>No quotes yet.</p>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePrev}
          disabled={index <= 1}
          className={`px-4 py-2 rounded-lg ${
            index <= 1
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

