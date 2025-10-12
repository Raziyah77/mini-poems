import { useState } from "react";

function LandingPage({ onGenerate }) {
  const [theme, setTheme] = useState("");

  const handleClick = () => {
    const cleanedTheme =
      !theme || theme.trim() === "" ? "random" : theme.trim().toLowerCase();
    onGenerate(cleanedTheme);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
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
        className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-pink-100"
      >
        Generate
      </button>
    </div>
  );
}

export default LandingPage;
