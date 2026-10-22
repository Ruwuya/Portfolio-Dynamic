import { useState, useEffect } from "react";

import { modules, allTasks } from "./lessons.js";

import { loadProgress, updateProgress, clearProgress } from "./storage.js";

import Sidebar from "./components/Sidebar.jsx";
import TaskPage from "./components/TaskPage.jsx";

// "#2.1" → "2.1"
function idFromHash() {
  return decodeURIComponent(window.location.hash.slice(1));
}

// The position in allTasks of the task in the URL, or -1 if it doesn't exist
function indexFromHash() {
  return allTasks.findIndex((t) => t.id === idFromHash());
}

export default function App() {
  const [index, setIndex] = useState(() => {
    const fromUrl = indexFromHash();
    if (fromUrl !== -1) return fromUrl;
    return Math.min(loadProgress().index ?? 0, allTasks.length - 1);
  });
  const task = allTasks[index];

  const [solvedIds, setSolvedIds] = useState(() => loadProgress().solved ?? []);

  // On phones the sidebar is hidden behind an "Opgaver" button
  const [menuOpen, setMenuOpen] = useState(false);

  function markSolved(id) {
    if (!solvedIds.includes(id)) setSolvedIds([...solvedIds, id]);
  }

  // Listen for the # changing (menu, Forrige/Næste, the back button, a pasted link)
  useEffect(() => {
    function onHashChange() {
      const i = indexFromHash();
      if (i !== -1) setIndex(i);
      setMenuOpen(false); // close the phone menu after choosing a task
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Make sure the URL always shows the current task - also on first load
  useEffect(() => {
    const id = allTasks[index].id;
    if (idFromHash() !== id) window.history.replaceState(null, "", "#" + id);
  }, [index]);

  // Save whenever index or solvedIds change
  useEffect(() => {
    updateProgress((p) => {
      p.index = index;
      p.solved = solvedIds;
    });
  }, [index, solvedIds]);

  function startOver() {
    if (window.confirm("Vil du starte hele kurset forfra? Alle løste opgaver og al din kode bliver slettet på denne computer.")) {
      clearProgress();
      // Load the page without the #, so it starts at the first task
      window.location.replace(window.location.pathname);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Python for brobyggere</h1>
          <p className="tagline">Lær at kode i Python, direkte i browseren.</p>
        </div>
        <button
          className="btn menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Luk" : "Opgaver"}
        </button>
      </header>

      <div className="layout">
        <Sidebar
          modules={modules}
          currentId={task.id}
          solvedIds={solvedIds}
          onStartOver={startOver}
          open={menuOpen}
        />

        <main className="content">
          <TaskPage key={task.id} task={task} solved={solvedIds.includes(task.id)} onSolved={markSolved} />

          <nav className="pager">
            <button className="btn btn-secondary" onClick={() => { window.location.hash = allTasks[index - 1].id; }} disabled={index === 0}>
              Forrige
            </button>
            <span>Opgave {index + 1} af {allTasks.length}</span>
            <button className="btn btn-secondary" onClick={() => { window.location.hash = allTasks[index + 1].id; }} disabled={index === allTasks.length - 1}>
              Næste
            </button>
          </nav>
        </main>
      </div>
    </div>
  )
}
