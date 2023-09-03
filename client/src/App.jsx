import React from "react";
import Chat from "./components/chat";
import Login from "./components/login";
import Register from "./components/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/landing";
import About from "./components/about";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About/>} />        </Routes>
    </Router>
  );
}
