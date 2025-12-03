import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import SearchPage from "./pages/SearchPage";
import RankingPage from "./pages/RankingPage";
import RecommendPage from "./pages/RecommendPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Search</Link>
        <Link to="/rank">Rank</Link>
        <Link to="/recommend">Recommend</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/rank" element={<RankingPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

