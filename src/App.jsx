import { useState } from "react";
import LandingPage from "./components/LandingPage";
import MainScreen from "./pages/MainScreen";

function App() {
  const [theme, setTheme] = useState("");
  const [showMain, setShowMain] = useState(false);

  const handleGenerate = (selectedTheme) => {
    const cleanedTheme =
      !selectedTheme || selectedTheme.trim() === ""
        ? "random"
        : selectedTheme.toLowerCase();
    setTheme(cleanedTheme);
    setShowMain(true);
  };

  return (
    <>
      {showMain ? (
        <MainScreen theme={theme} />
      ) : (
        <LandingPage onGenerate={handleGenerate} />
      )}
    </>
  );
}

export default App;
