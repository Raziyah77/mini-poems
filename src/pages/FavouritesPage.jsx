import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  // Load favourites from localStorage when the component mounts
  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  // Remove quote from favourites
  const removeFavourite = (index) => {
    const updated = favourites.filter((_, i) => i !== index);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favourite Poems</h1>

      {favourites.length === 0 ? (
        <p className="text-gray-400">No favourites yet.</p>
      ) : (
        <div className="w-full max-w-lg space-y-6">
          {favourites.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl p-4 bg-gray-800 shadow-lg"
            >
              <p className="text-lg mb-2">"{item.quote}"</p>
              <p className="text-sm text-gray-400 mb-4">— {item.author}</p>
              <button
                onClick={() => removeFavourite(index)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          Go to Landing Page
        </button>
        <button
          onClick={() => navigate("/main")}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Back to Main Screen
        </button>
      </div>
    </div>
  );
}

export default FavouritesPage;
