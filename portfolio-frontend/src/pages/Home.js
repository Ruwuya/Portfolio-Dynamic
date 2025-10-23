import React from "react";

export default function Home({ language }) {
  return (
    <div className="home-container">
      <h1 className="home-title">
        {language === "en"
          ? "Welcome to My Portfolio"
          : "Velkommen til Mit Portfolio"}
      </h1>

      <div className="home-grid">
        {/* Intro Box */}
        <div className="home-card intro-card">
          <p>
            {language === "en" ? (
              <>
                Hi! I'm <strong>Rene Hinrichsen</strong>, a data technician
                apprentice specializing in programming. I enjoy building clean,
                efficient, and creative software solutions using{" "}
                <strong>C#</strong>, <strong>Python</strong>, and{" "}
                <strong>SQL</strong>.
              </>
            ) : (
              <>
                Hej! Jeg hedder <strong>Rene Hinrichsen</strong>, og jeg er
                datatekniker-elev med speciale i programmering. Jeg nyder at
                bygge effektive og kreative softwareløsninger med{" "}
                <strong>C#</strong>, <strong>Python</strong> og{" "}
                <strong>SQL</strong>.
              </>
            )}
          </p>

          <div className="home-buttons">
            <a href="/projects">
              {language === "en" ? "View My Projects" : "Se Mine Projekter"}
            </a>
            <a href="/about">
              {language === "en"
                ? "Learn More About Me"
                : "Læs Mere Om Mig"}
            </a>
          </div>
        </div>

        {/* Technologies Box */}
        <div className="home-card">
          <h2>
            {language === "en"
              ? "Technologies I Work With"
              : "Teknologier Jeg Arbejder Med"}
          </h2>
          <div className="home-skills">
            <span>C#</span>
            <span>Python</span>
            <span>SQL (MSSQL / MySQL)</span>
            <span>Entity Framework</span>
            <span>WPF / Blazor</span>
          </div>
        </div>

        {/* Social Links Box */}
        <div className="home-card">
          <h2>
            {language === "en" ? "Find Me Online" : "Find Mig Online"}
          </h2>
          <div className="home-socials">
            <a href="https://github.com/Ruwuya" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/rene-hinrichsen" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}