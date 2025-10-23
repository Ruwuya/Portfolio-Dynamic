import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

function App() {
  // language state to manage current language selection
  const [language, setLanguage] = useState("en");

  return (
    <Router>
      {/* Pass language + setter down to Navbar */}
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Pass the language down to each page */}
      <Routes>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/about" element={<About language={language} />} />
        <Route path="/projects" element={<Projects language={language} />} />
      </Routes>
    </Router>
  );
}

export default App;