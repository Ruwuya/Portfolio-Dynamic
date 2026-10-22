import { useState, useEffect } from "react";
import { runPython } from "../python.js";
import { explainError } from "../errors.js";
import { loadProgress, updateProgress } from "../storage.js";
import CodeEditor from "./CodeEditor.jsx";
import InputDialog from "./InputDialog.jsx";

export default function TaskPage({ task, solved, onSolved }) {
    const [code, setCode] = useState(() => loadProgress().code?.[task.id] ?? task.starter);

    const [tries, setTries] = useState(() => loadProgress().tries?.[task.id] ?? 0);
    const triesNeeded = 2;
    const canSeeSolution = tries >= triesNeeded;

    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);

    const [feedback, setFeedback] = useState(null); // Okay message

    const [hintsShown, setHintsShown] = useState(0);
    const hints = task.hints || [];

    const [errorInfo, setErrorInfo] = useState(null);

    // The question input() is waiting for, plus the function that sends the answer back
    const [inputRequest, setInputRequest] = useState(null);

    // Save this task's code and tries whenever they change
    useEffect(() => {
        updateProgress((p) => {
            p.code = { ...p.code, [task.id]: code };
            p.tries = { ...p.tries, [task.id]: tries };
        });
    }, [task.id, code, tries]);

    // Shows the pop-up and waits. Gives the answer, or null if the student stopped the program.
    function askInput(question) {
        return new Promise((resolve) => {
            setInputRequest({ question, resolve, id: Date.now() });
        });
    }

    async function handleRun() {
        setRunning(true);
        setOutput("Kører...");
        setFeedback(null);
        setErrorInfo(null);

        // Run until the program no longer waits for input(). Each answer is added,
        // and the program runs again from the start with all the answers ready.
        const seed = Math.floor(Math.random() * 1000000);
        const inputs = [];
        let result = await runPython(code, inputs, seed);
        while (result.needInput !== null && !result.timeout) {
            setOutput(result.output + result.needInput);
            const answer = await askInput(result.needInput);
            if (answer === null) {
                setFeedback({ ok: false, message: "Du stoppede programmet. Tryk Kør for at prøve igen." });
                setRunning(false);
                return;
            }
            inputs.push(answer);
            result = await runPython(code, inputs, seed);
        }

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
        <section className="task">
            <h2>{task.id} {task.title}</h2>
            <p className="task-text">{task.text}</p>

            <CodeEditor
                value={code}
                onChange={setCode}
                onRun={() => { if (!running) handleRun() }}
            />
            <div className="actions">
                <button className="btn btn-primary" onClick={handleRun} disabled={running}>
                    {running ? "Kører..." : "Kør"}
                </button>
                <button className="btn btn-secondary" onClick={resetCode} disabled={running}>Nulstil kode</button>
                <span className="shortcut">eller Ctrl + Enter</span>
            </div>

            <div className="output-label">Output</div>
            <pre className="output">{output}</pre>
            {inputRequest && (
                <InputDialog
                    key={inputRequest.id}
                    question={inputRequest.question}
                    onSubmit={(answer) => { setInputRequest(null); inputRequest.resolve(answer); }}
                    onCancel={() => { setInputRequest(null); inputRequest.resolve(null); }}
                />
            )}
            {errorInfo && (
                <div className="box error-box">
                    <strong>{errorInfo.title}</strong>
                    <p>{errorInfo.text}</p>
                    {errorInfo.line && <p>Fejlen er i linje {errorInfo.line}.</p>}
                    <details>
                        <summary>Pythons egen fejlbesked</summary>
                        <pre>{errorInfo.original}</pre>
                    </details>
                </div>
            )}

            {feedback && (
                <p className={feedback.ok ? "box feedback ok" : "box feedback not-yet"}>{feedback.message}</p>
            )}

            {(solved || canSeeSolution) && (
                <details className="good-to-know" open={solved}>
                    <summary>Godt at vide</summary>
                    <p>{task.goodToKnow}</p>
                </details>
            )}

            <div className="help">
                {hints.slice(0, hintsShown).map((hint, i) => (
                    <p key={i} className="hint">💡 {hint}</p>
                ))}
                {hintsShown < hints.length && (
                    <button className="btn btn-secondary" onClick={() => setHintsShown(hintsShown + 1)}>
                        Vis et hint ({hintsShown + 1} af {hints.length})
                    </button>
                )}

                {canSeeSolution ? (
                    <details className="solution">
                        <summary>Se løsning</summary>
                        <pre>{task.solution}</pre>
                    </details>
                ) : (
                    <button className="btn btn-secondary" disabled>
                        Se løsning (efter {triesNeeded} forsøg - du har prøvet {tries})
                    </button>
                )}
            </div>

        </section>
    )
}
