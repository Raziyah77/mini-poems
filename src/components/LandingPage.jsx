import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (theme.trim() !== "") {
      navigate(`/main?theme=${theme}`);
    } else {
      alert("Please enter a theme to get started!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 to-blue-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-8">Mini Poems ✨</h1>

      <p className="text-lg mb-6 text-gray-700 text-center max-w-md">
        A collection of short, meaningful lines — powered by the Quotable API.
        Enter a theme like <span className="font-semibold">love</span>,{" "}
        <span className="font-semibold">life</span>, or{" "}
        <span className="font-semibold">motivation</span>.
      </p>

      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="Enter a theme..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleGenerate}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
      >
        Generate
      </button>
    </div>
  );
}
