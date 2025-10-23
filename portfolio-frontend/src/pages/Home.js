import React, { useEffect, useState } from "react";
import { getProjects } from "../api/api";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found yet...</p>
      ) : (
        projects.map((p) => (
          <div className="project" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.github_link} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        ))
      )}
    </div>
  );
}
