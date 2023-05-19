import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Notes from "./components/Notes";
import Login from "./components/Login";
import withAuth from "./components/withAuth";

const ProtectedNotes = withAuth(Notes);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/notes" element={<ProtectedNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
