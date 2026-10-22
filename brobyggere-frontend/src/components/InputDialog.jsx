import { useEffect, useRef, useState } from "react";

// Pop-up box for input(): shows Python's question and waits for the student's answer
export default function InputDialog({ question, onSubmit, onCancel }) {
    const ref = useRef(null);
    const [answer, setAnswer] = useState("");

    // <dialog> has to be opened with showModal() to sit on top of the page
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog.open) dialog.showModal();
        return () => dialog.close();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(answer);
    }

    return (
        <dialog
            ref={ref}
            className="input-dialog"
            // Esc closes the box – treat it the same as "Stop programmet"
            onCancel={(e) => { e.preventDefault(); onCancel(); }}
        >
            <form onSubmit={handleSubmit}>
                <p>Programmet spørger:</p>
                <label>
                    <strong>{question.trim() || "Skriv et svar"}</strong>
                    <input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        autoFocus
                        autoComplete="off"
                    />
                </label>
                <div>
                    <button type="button" onClick={onCancel}>Stop programmet</button>
                    <button type="submit">OK</button>
                </div>
            </form>
        </dialog>
    );
}
