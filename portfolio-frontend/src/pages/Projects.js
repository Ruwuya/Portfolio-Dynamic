import React, { useEffect, useState } from "react";
import { getProjects } from "../api/api";

export default function Projects({ language }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  // Translations for UI text
  const translations = {
    en: {
      title: "My Projects",
      name: "Name",
      description: "Description",
      none: "No projects found yet...",
      view: "View on GitHub",
    },
    da: {
      title: "Mine Projekter",
      name: "Navn",
      description: "Beskrivelse",
      none: "Ingen projekter fundet endnu...",
      view: "Se på GitHub",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className="projects-container">
      <h1>{t.title}</h1>

      {projects.length === 0 ? (
        <p>{t.none}</p>
      ) : (
        projects.map((p) => (
          <div className="project-card" key={p.id}>
            <p>
              <strong>{t.name}:</strong> {p.title}
            </p>
            <p>
              <strong>{t.description}:</strong> {p.description}
            </p>
            <a href={p.github_link} target="_blank" rel="noreferrer">
              {t.view}
            </a>
          </div>
        ))
      )}
    </div>
  );
}