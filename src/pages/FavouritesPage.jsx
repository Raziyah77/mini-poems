import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FavouritesPage() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < favourites.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleRemove = () => {
    const updated = favourites.filter((_, i) => i !== currentIndex);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
    if (currentIndex >= updated.length && updated.length > 0)
      setCurrentIndex(updated.length - 1);
  };

  const currentQuote = favourites[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-purple-600 text-white text-center px-6">
      <h1 className="text-2xl font-bold mb-4">Your Favourites</h1>

      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <>
          <div className="bg-white/20 p-6 rounded-2xl max-w-md">
            <p className="text-lg italic mb-4">"{currentQuote.q}"</p>
            <p className="font-bold mb-6">— {currentQuote.a}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= favourites.length - 1}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={handleRemove}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Remove
            </button>
          </div>
        </>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/main")}
          className="underline hover:text-gray-200"
        >
          Back to MainScreen
        </button>
        <button
          onClick={() => navigate("/")}
          className="underline hover:text-gray-200"
        >
          Back to Landing Page
        </button>
      </div>
    </div>
  );
}

export default FavouritesPage;
