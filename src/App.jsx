import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainScreen from "./pages/MainScreen";
import FavouritesPage from "./pages/FavouritesPage"; // will create this next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
