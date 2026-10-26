import { useEffect, useRef, useState } from "react";

// Answer field for input(), shown right under the output like in a terminal.
// The question and the earlier output stay visible above it.
export default function InputBox({ onSubmit, onCancel }) {
    const ref = useRef(null);
    const [answer, setAnswer] = useState("");

    // Put the cursor in the field, and scroll it into view on small screens
    useEffect(() => {
        ref.current.focus();
        ref.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(answer);
    }

    return (
        <form className="input-box" onSubmit={handleSubmit}>
            <label>
                <span>Dit svar</span>
                <input
                    ref={ref}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    // Esc does the same as "Stop programmet"
                    onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); onCancel(); } }}
                    autoComplete="off"
                    spellCheck={false}
                />
            </label>
            <button type="submit" className="btn btn-primary">OK</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Stop programmet</button>
        </form>
    );
}
