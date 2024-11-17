import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./contexts/NoteState";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
