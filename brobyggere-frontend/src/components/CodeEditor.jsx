import { useRef } from "react";
import { tokenize } from "../highlight.js";

const INDENT = "    "; // 4 spaces

export default function CodeEditor({ value, onChange, onRun }) {
    const ref = useRef(null);         // the <textarea> element itself
    const escPressed = useRef(false); // was Esc pressed just now?
    const highlightRef = useRef(null); // the coloured <pre> behind the textarea

    // Inserts text at the cursor. execCommand keeps Ctrl+Z working.
    function insert(text) {
        if (!document.execCommand("insertText", false, text)) {
            const ta = ref.current;
            ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, "end");
            onChange(ta.value);
        }
    }

    // Deletes the characters from position "from" to "to"
    function remove(from, to) {
        const ta = ref.current;
        ta.setSelectionRange(from, to);
        if (!document.execCommand("delete")) {
            ta.setRangeText("", from, to, "end");
            onChange(ta.value);
        }
    }

    function handleKeyDown(e) {
        const ta = ref.current;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
        const beforeCursor = ta.value.slice(lineStart, start); // the line up to the cursor

        // Ctrl+Enter (Cmd+Enter on Mac) runs the code
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            onRun();
            return;
        }

        // Esc followed by Tab leaves the field as normal
        if (e.key === "Escape") {
            escPressed.current = true;
            return;
        }
        if (e.key === "Tab" && escPressed.current) {
            escPressed.current = false;
            return;
        }
        escPressed.current = false;

        if (e.key === "Tab") {
            e.preventDefault();
            if (e.shiftKey) {
                const spaces = ta.value.slice(lineStart).match(/^ */)[0].length;
                const count = Math.min(spaces, INDENT.length);
                if (count > 0) {
                    remove(lineStart, lineStart + count);
                    ta.setSelectionRange(Math.max(lineStart, start - count), Math.max(lineStart, end - count));
                }
            } else {
                insert(INDENT);
            }
            return;
        }

        // Enter: keep the indentation - and add 4 more after a line ending in ":"
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            let indent = beforeCursor.match(/^ */)[0];
            if (/:\s*$/.test(beforeCursor)) indent += INDENT;
            insert("\n" + indent);
            return;
        }

        // Backspace in the indentation removes back to the previous level
        if (e.key === "Backspace" && start === end && /^ +$/.test(beforeCursor)) {
            e.preventDefault();
            const count = ((beforeCursor.length - 1) % INDENT.length) + 1;
            remove(start - count, start);
        }
    }

    // When the textarea scrolls, the coloured copy behind it must scroll the same amount
    function syncScroll() {
        highlightRef.current.scrollTop = ref.current.scrollTop;
        highlightRef.current.scrollLeft = ref.current.scrollLeft;
    }

    const lineCount = value.split("\n").length;

    return (
        <div className="code-editor-wrap">
            <pre ref={highlightRef} className="code-highlight" aria-hidden="true">
                {tokenize(value).map((token, i) => (
                    <span key={i} className={`tok-${token.type}`}>{token.text}</span>
                ))}
                {/* An extra line break, so an empty last line has height too */}
                {"\n"}
            </pre>
            <textarea
                ref={ref}
                className="code-editor"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={syncScroll}
                rows={Math.max(8, lineCount + 1)}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                wrap="off"
                aria-label="Kodefelt. Tryk Esc og derefter Tab for at forlade feltet."
            />
        </div>
    );
}