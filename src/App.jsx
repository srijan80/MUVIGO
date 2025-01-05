import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { Movie } from './Pages/MoviePage';
import { Music } from './Pages/MusicPage';
import {Game}  from './Pages/GamePage';
import CurdPage  from './Pages/CurdPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/music" element={<Music />} />
        <Route path="/games" element={<Game />} />
        <Route path="/movies/curd" element={<CurdPage />} />

      </Routes>
    </Router>
  );
}

export default App;