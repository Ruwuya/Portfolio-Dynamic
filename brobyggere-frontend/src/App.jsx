import { tasks } from "./lessons.js";
import TaskPage from "./components/TaskPage.jsx";

export default function App() {
  return (
    <main>
      <h1>Python for Brobyggere</h1>
      <p>Lær at kode i Python, direkte i browseren.</p>
      <TaskPage task={tasks[0]} />
    </main>
  )
}