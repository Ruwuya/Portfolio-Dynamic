import { useState, useEffect } from "react";
import { runPython } from "../python.js";
import { explainError } from "../errors.js";
import { loadProgress, updateProgress } from "../storage.js";
import CodeEditor from "./CodeEditor.jsx";

export default function TaskPage({ task, solved, onSolved }) {
    const [code, setCode] = useState(() => loadProgress().code?.[task.id] ?? task.starter);

    const [tries, setTries] = useState(() => loadProgress().tries?.[task.id] ?? 0);
    const triesNeeded = 3;
    const canSeeSolution = tries >= triesNeeded;

    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);

    const [feedback, setFeedback] = useState(null); // Okay message

    const [hintsShown, setHintsShown] = useState(0);
    const hints = task.hints || [];

    const [errorInfo, setErrorInfo] = useState(null);

    // Save this task's code and tries whenever they change
    useEffect(() => {
        updateProgress((p) => {
            p.code = { ...p.code, [task.id]: code };
            p.tries = { ...p.tries, [task.id]: tries };
        });
    }, [task.id, code, tries]);

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
            verdict = "Koden gav en fejl - se forklaringen ovenfor.";
        } else {
            setOutput(result.output || "Intet blev udskrevet");
            verdict = task.check(result.output, code);
        }

        if (verdict === true) {
            onSolved(task.id);
            setFeedback({ ok: true, message: "Godt klaret!" });
        } else {
            setTries(tries + 1);
            setFeedback({ ok: false, message: verdict });
        }
        setRunning(false);
    }

    // Brings back the starter code. Tries and "Løst" are kept.
    function resetCode() {
        if (window.confirm("Vil du hente startkoden tilbage? Din egen kode til denne opgave bliver slettet.")) {
            setCode(task.starter);
            setOutput("");
            setFeedback(null);
            setErrorInfo(null);
        }
    }

    return (
        <section>
            <h2>{task.id} {task.title}</h2>
            <p>{task.text}</p>
            <CodeEditor
                value={code}
                onChange={setCode}
                onRun={() => { if (!running) handleRun() }}
            />
            <button onClick={handleRun} disabled={running}>
                {running ? "Kører..." : "Kør"}
            </button>
            <button onClick={resetCode} disabled={running}>Nulstil kode</button>
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