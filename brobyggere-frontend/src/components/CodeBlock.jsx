import { tokenize } from "../highlight.js";

// Shows a piece of Python code with the same colours as the editor
export default function CodeBlock({ code, className }) {
    return (
        <pre className={className}>
            {tokenize(code).map((token, i) => (
                <span key={i} className={`tok-${token.type}`}>{token.text}</span>
            ))}
        </pre>
    );
}