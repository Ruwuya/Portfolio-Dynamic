import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ language, setLanguage }) {
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "da" : "en"));
  };

  return (
    <nav className="navbar">
      {/* Left side: site title / logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          {language === "en" ? "Rene Hinrichsen" : "Rene Hinrichsen"}
        </Link>
      </div>

      {/* Center: navigation links */}
      <div className="navbar-links">
        <Link to="/">{language === "en" ? "Home" : "Forside"}</Link>
        <Link to="/about">{language === "en" ? "About" : "Om Mig"}</Link>
        <Link to="/projects">{language === "en" ? "Projects" : "Projekter"}</Link>
      </div>

      {/* Right side: language button */}
      <div className="navbar-right">
        <button onClick={toggleLanguage} className="lang-button">
          {language === "en" ? "🇩🇰 Dansk" : "🇬🇧 English"}
        </button>
      </div>
    </nav>
  );
}