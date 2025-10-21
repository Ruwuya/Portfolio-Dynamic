import React, { useEffect, useState } from "react";
import { getProjects } from "./api/api";

// Renders the frontend of the portfolio application
function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Portfolio</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;