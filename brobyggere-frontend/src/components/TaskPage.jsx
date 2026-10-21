import { useState } from "react";
import { runPython } from "../python.js";
import { explainError } from "../errors.js";

export default function TaskPage({ task, onSolved }) {
    const [code, setCode] = useState(task.starter);

    const [tries, setTries] = useState(0);
    const triesNeeded = 3;
    const canSeeSolution = tries >= triesNeeded;

    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);

    const [feedback, setFeedback] = useState(null); // Okay message
    const [solved, setSolved] = useState(false); // Task solved

    const [hintsShown, setHintsShown] = useState(0);
    const hints = task.hints || [];

    const [errorInfo, setErrorInfo] = useState(null);

    async function handleRun() {
        setRunning(true);
        setOutput("Kører...");
        setFeedback(null);
        setErrorInfo(null);

        const result = await runPython(code);
        // A stop or an error counts as a failed attempt. Otherwise the task's own check decides.
        let verdict;
        if (result.timeout) {
            setOutput("");
            verdict = "Programmet kørte i mere end 5 sekunder, så vi stoppede det. Det sker tit, hvis en løkke aldrig bliver færdig.";
        } else if (result.error) {
            setOutput(result.output);
            setErrorInfo(explainError(result.error));
            verdict = "Koden gav en fejl - se forklaring nedenfor.";
        } else {
            setOutput(result.output || "Intet blev udskrevet");
            verdict = task.check(result.output, code);
        }

        if (verdict === true) {
            setSolved(true);
            onSolved(task.id);
            setFeedback({ ok: true, message: "Godt klaret!" });
        } else {
            setTries(tries + 1);
            setFeedback({ ok: false, message: verdict });
        }
        setRunning(false);
    }

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
            <button onClick={handleRun} disabled={running}>
                {running ? "Kører..." : "Kør"}
            </button>
            <pre>{output}</pre>
            {errorInfo && (
            <div className="error">
                <strong>{errorInfo.title}</strong>
                <p>{errorInfo.text}</p>
                {errorInfo.line && <p>Fejlen er i linje {errorInfo.line}.</p>}
                <details>
                    <summary>Pythons egen fejlbesked</summary>
                    <pre>{errorInfo.original}</pre>
                </details>
            </div>
            )}

            {feedback && <p>{feedback.message}</p>}

            {hints.slice(0, hintsShown).map((hint, i) => (
                <p key={i}>💡 {hint}</p>
            ))}
            {hintsShown < hints.length && (
                <button onClick={() => setHintsShown(hintsShown + 1)}>
                    Vis et hint ({hintsShown + 1} af {hints.length})
                </button>
            )}

            {(solved || canSeeSolution) && (
                <details open={solved}>
                    <summary>Godt at vide</summary>
                    <p>{task.goodToKnow}</p>
                </details>
            )}
            {canSeeSolution ? (
                <details>
                    <summary>Se løsning</summary>
                    <pre>{task.solution}</pre>
                </details>
            ) : (
                <button disabled>
                    Se løsning (efter {triesNeeded} forsøg - du har prøvet {tries})
                </button>
            )}
        </section>
    )
}