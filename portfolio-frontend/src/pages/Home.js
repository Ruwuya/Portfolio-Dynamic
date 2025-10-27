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
                Welcome to my portfolio website where I learned how to build web
                applications using React.js and showcase my projects.
                <br />
                <br />
                Hi! I'm <strong>Rene Hinrichsen</strong>, a data technician
                apprentice specializing in programming. I enjoy building clean,
                efficient, and creative software solutions using{" "}
                <strong>C#</strong>, <strong>Python</strong>, and{" "}
                <strong>SQL</strong>.
                <br />
                <br />
                Feel free to explore my projects and learn more about me!
                In my About section you can find more information about my
                background, skills and my grades up to this point in SDE.
                And in my Projects section you can see some of the work I have done so far.
                And you can see my GitHub and LinkedIn profiles in the "Find me online" section.

              </>
            ) : (
              <>
                Velkommen til mit portfolio website, hvor jeg har lært at bygge
                webapplikationer med React.js og vise mine projekter frem.
                <br />
                <br />
                Hej! Jeg hedder <strong>Rene Hinrichsen</strong>, og jeg er
                datatekniker-elev med speciale i programmering. Jeg nyder at
                bygge effektive og kreative softwareløsninger med{" "}
                <strong>C#</strong>, <strong>Python</strong> og{" "}
                <strong>SQL</strong>.
                <br />
                <br />
                Du er velkommen til at udforske mine projekter og lære mere om mig!
                I min Om Mig sektion kan du finde mere information om min
                baggrund, færdigheder og mine karakterer indtil nu i SDE.
                Og i mine Projekter sektion kan du se noget af det arbejde, jeg
                har lavet indtil videre.
                Du kan også finde mine GitHub og LinkedIn profiler i "Find mig online" sektionen.
              </>
            )}
          </p>

          <div className="home-buttons">
            <a href="/projects">
              {language === "en" ? "View My Projects" : "Se Mine Projekter"}
            </a>
            <a href="/about">
              {language === "en"
                ? "Learn more about me"
                : "Læs mere om mig"}
            </a>
          </div>
        </div>

        {/* Technologies Box */}
        <div className="home-card">
          <h2>
            {language === "en"
              ? "Technologies I work with"
              : "Teknologier jeg arbejder med"}
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
            {language === "en" ? "Find me online" : "Find mig online"}
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