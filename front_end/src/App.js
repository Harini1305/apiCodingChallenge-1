import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import ViewBook from "./pages/ViewBook";
import SearchBook from "./pages/SearchBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-book" element={<AddBook />} />

        <Route path="/view-books" element={<ViewBook />} />

        <Route path="/search-book" element={<SearchBook />} />

        <Route path="/update-book" element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
