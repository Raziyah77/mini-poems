import React, { useEffect, useState } from "react";

const MainScreen = ({ theme }) => {
  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.quotable.io/random?tags=${theme}`);
      const data = await response.json();
      const newQuote = { content: data.content, author: data.author };

      setQuotes((prev) => [...prev, newQuote]);
      setIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, [theme]);

  const handlePrevious = () => {
    if (index > 1) setIndex(index - 1);
  };

  const current = quotes[index - 1];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-400 to-pink-500 text-white text-center p-5">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        Theme: {theme || "random"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : current ? (
        <>
          <p className="text-xl italic mb-4 max-w-2xl">"{current.content}"</p>
          <p className="text-lg font-medium">— {current.author}</p>
        </>
      ) : (
        <p>No quotes yet...</p>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrevious}
          disabled={index <= 1}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={fetchQuote}
          className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
