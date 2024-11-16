import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./contexts/NoteState";
import './App.css'
export default function App() {
  return (
    <>
    <NoteState>
      <Router
        future={{
          v7_relativeSplatPath: true,
        }}
      >
        <div>
          <Navbar />
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
    </>
  );
}
