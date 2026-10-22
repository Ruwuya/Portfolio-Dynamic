import { useState, useEffect } from "react";

import { modules, allTasks } from "./lessons.js";

import { loadProgress, updateProgress, clearProgress } from "./storage.js";

import Sidebar from "./components/Sidebar.jsx";
import TaskPage from "./components/TaskPage.jsx";

export default function App() {
  const [index, setIndex] = useState(() => Math.min(loadProgress().index ?? 0, allTasks.length -1));
  const task = allTasks[index];

  const [solvedIds, setSolvedIds] = useState(() => loadProgress().solved ?? []);

  function markSolved(id) {
    if (!solvedIds.includes(id)) setSolvedIds([...solvedIds, id]);
  }

  function selectTask(id) {
    setIndex(allTasks.findIndex((task) => task.id === id));
  }

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
      window.location.reload();
    }
  }

  return (
    <main>
      <h1>Python for Brobyggere</h1>
      <p>Lær at kode i Python, direkte i browseren.</p>
      <div className="layout">
        <Sidebar
          modules={modules}
          currentId={task.id}
          solvedIds={solvedIds}
          onSelect={selectTask}
          onStartOver={startOver}
        />

        <div>
          <TaskPage key={task.id} task={task} solved={solvedIds.includes(task.id)} onSolved={markSolved} />

          <nav>
            <button onClick={() => setIndex(index - 1)} disabled={index === 0}>
              Forrige
            </button>
            <span> Opgave {index + 1} af {allTasks.length} </span>
            <button onClick={() => setIndex(index + 1)} disabled={index === allTasks.length - 1}>
              Næste
            </button>
          </nav>
        </div>
      </div>
    </main>
  )
}
