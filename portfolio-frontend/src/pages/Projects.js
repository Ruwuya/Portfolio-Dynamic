import React from "react";

export default function Projects({ language }) {
  return (
    <div className="projects-container" style={{ padding: "2rem" }}>
      <h1>{language === "en" ? "My Projects" : "Mine Projekter"}</h1>
      <p>
        {language === "en"
          ? "This page will soon showcase my programming projects."
          : "Denne side vil snart vise mine programmeringsprojekter."}
      </p>
    </div>
  );
}