import { useState } from "react";

import { modules, allTasks } from "./lessons.js";

import Sidebar from "./components/Sidebar.jsx";
import TaskPage from "./components/TaskPage.jsx";

export default function App() {
  const [index, setIndex] = useState(0);
  const task = allTasks[index];

  const [solvedIds, setSolvedIds] = useState([]);

  function markSolved(id) {
    if (!solvedIds.includes(id)) setSolvedIds([...solvedIds, id]);
  }

  function selectTask(id) {
    setIndex(allTasks.findIndex((task) => task.id === id));
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
        />

        <div>
          <TaskPage key={task.id} task={task} onSolved={markSolved} />

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
