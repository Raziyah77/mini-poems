import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainScreen from "./pages/MainScreen";
import FavouritesPage from "./pages/FavouritesPage";


function AppWrapper() {
  const navigate = useNavigate();

  
  const handleGenerate = (theme) => {
    navigate("/main", { state: { theme } });
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onGenerate={handleGenerate} />} />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
