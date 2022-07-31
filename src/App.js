import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";
import { Home, Movies } from "./pages";
import { Movie } from "./components";

const App = function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="movies" element={<Movies />}>
        <Route path=":category" element={<Navigate to="all" />} />
        <Route path=":category/:genre" element={<Navigate to="1" />} />
        <Route path=":category/:genre/:page" element={<Movie />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
