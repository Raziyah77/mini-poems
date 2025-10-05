import React, { useEffect, useState } from "react";

const MainScreen = ({ theme }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch quote based on theme
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.quotable.io/random?tags=${theme}`);
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Oops! Could not fetch a quote. Try again!");
      setAuthor("");
    }
    setLoading(false);
  };

  // Fetch the first quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, [theme]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-400 to-pink-500 text-white text-center p-5">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        Theme: {theme || "random"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-xl italic mb-4 max-w-2xl">"{quote}"</p>
          <p className="text-lg font-medium">— {author}</p>
        </>
      )}
    </div>
  );
};

export default MainScreen;
