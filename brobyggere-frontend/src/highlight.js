// Python words that get their own colour
const KEYWORDS = new Set([
    "if", "elif", "else", "while", "for", "in", "and", "or", "not", "is",
    "import", "from", "as", "def", "return", "break", "continue", "pass",
    "True", "False", "None",
]);

const BUILTINS = new Set([
    "print", "input", "int", "str", "float", "len", "range", "type",
    "round", "abs", "min", "max",
]);

// One pattern with a group for each kind of piece:
//   1: a comment # ... to the end of the line
//   2: text      "..." or '...' (also unfinished text while student is typing)
//   3: a number  15 or 3.5
//   4: a word    a name, keyword, or builtin (also with æ, ø, å)
// Comments and text come first, so a # inside "..." isn't a comment
// and words inside text don't get coloured.
const TOKEN = /(#.*)|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|(\b\d+(?:\.\d+)?\b)|([\p{L}_][\p{L}\p{N}_]*)/gu;


// Split Python code into pieces with a type, e.g { type: "string", text: '"Hej"' }
export function tokenize(code) {
    const tokens = [];
    let last = 0; // how far we've got in the code

    for (const match of code.matchAll(TOKEN)) {
        // Everything between the previous match and this one is plain
        if (match.index > last) tokens.push({ type: "plain", text: code.slice(last, match.index) });

        const [text, comment, string, number, word] = match;
        let type = "plain";
        if (comment) type = "comment";
        else if (string) type = "string";
        else if (number) type = "number";
        else if (KEYWORDS.has(word)) type = "keyword";
        else if (BUILTINS.has(word)) type = "builtin";
        else if (/^[A-Z][A-Z0-9_]*$/.test(word)) type = "constant"; // MYNDIG, PASSWORD, etc.

        tokens.push({ type, text });
        last = match.index + text.length;
    }

    // The rest after the last match
    if (last < code.length) tokens.push({ type: "plain", text: code.slice(last) });
    return tokens;
}