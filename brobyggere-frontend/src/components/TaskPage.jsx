import { useState } from "react";

export default function TaskPage({ task }) {
    const [code, setCode] = useState(task.starter);

    return (
        <section>
            <h2>{task.id} {task.title}</h2>
            <p>{task.text}</p>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={8}
                spellCheck={false}
            />
            <button onClick={() => alert(code)}>Kør</button>
            <details>
                <summary>Godt at vide</summary>
                <p>{task.goodToKnow}</p>
            </details>
            <details>
                <summary>Se løsning</summary>
                <pre>{task.solution}</pre>
            </details>
        </section>
    )
}