import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    const cleanedTheme =
      !theme || theme.trim() === "" ? "random" : theme.trim().toLowerCase();

    
    navigate("/main", { state: { theme: cleanedTheme } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-purple-700 text-white text-center px-6">
      <h1 className="text-3xl font-bold mb-6">Mini Poems Generator</h1>
      <input
        type="text"
        placeholder="Enter a theme (e.g. love, life, motivation)"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="text-black px-4 py-2 rounded-lg w-72 mb-4"
      />
      <button
        onClick={handleClick}
        className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
      >
        Generate
      </button>

      <button
        onClick={() => navigate("/favourites")}
        className="mt-4 text-white underline hover:text-gray-200 transition duration-200"
      >
        Go to Favourites
      </button>
    </div>
  );
}

export default LandingPage;
