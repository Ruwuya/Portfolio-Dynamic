import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ language, setLanguage }) {
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'da' : 'en'));
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        padding: '10px 20px',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          {language === 'en' ? 'Home' : 'Forside'}
        </Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
          {language === 'en' ? 'About' : 'Om mig'}
        </Link>
        <Link to="/projects" style={{ color: 'white', textDecoration: 'none' }}>
          {language === 'en' ? 'Projects' : 'Projekter'}
        </Link>
      </div>

      <button
        onClick={toggleLanguage}
        title={language === 'en' ? 'Skift til dansk' : 'Switch to English'}
        style={{
          backgroundColor: '#2563eb',
          border: 'none',
          borderRadius: '6px',
          color: 'white',
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        {language === 'en' ? '🇩🇰 Dansk' : '🇬🇧 English'}
      </button>
    </nav>
  );
}