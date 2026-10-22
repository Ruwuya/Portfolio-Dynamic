export default function Sidebar({ modules, currentId, solvedIds, onStartOver, open }) {
    return (
        <nav className={open ? "sidebar open" : "sidebar"}>
            {modules.map((module) => (
                <div key={module.id} className="module">
                    <h3 className="module-title">
                        {module.id} | {module.title}
                        {module.bonus && <small className="badge">Bonus</small>}
                    </h3>
                    <ul>
                        {module.tasks.map((task) => {
                            const done = solvedIds.includes(task.id);
                            return (
                                <li key={task.id}>
                                    <a href={`#${task.id}`} className={task.id === currentId ? "active" : ""}>
                                        <span className={done ? "status done" : "status"}>{done ? "Løst" : "-"}</span>
                                        <span>{task.id} | {task.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <button className="start-over" onClick={onStartOver}>
                Start hele kurset forfra
            </button>
        </nav>
    );
}
