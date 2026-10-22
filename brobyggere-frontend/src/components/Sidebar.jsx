export default function Sidebar({ modules, currentId, solvedIds, onStartOver }) {
    return (
        <nav className="sidebar">
            {modules.map((module) => (
                <div key={module.id}>
                    <h3>
                        {module.id} | {module.title}{" "}
                        <small>{module.bonus ? "Bonus" : `${module.minutes} min`}</small>
                    </h3>
                    <ul>
                        {module.tasks.map((task) => (
                            <li key={task.id}>
                                <a href={`#${task.id}`} className={task.id === currentId ? "active" : ""}>
                                    {solvedIds.includes(task.id) ? "Løst" : "-"} {task.id} | {task.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button className="start-over" onClick={onStartOver}>
                Start hele kurset forfra
            </button>
        </nav>
    );
}