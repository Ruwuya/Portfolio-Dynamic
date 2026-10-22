/* global importScripts, loadPyodide */
// Load Pyodide (Python in the browser) from a CDN
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

// A worker can't pause and wait for the student to type, so input() works like this:
// if there's no answer ready, Python stops and tells the page what the question is.
// The page asks the student, then runs the whole program again with the answers ready.
// random gets the same seed on every run, so e.g. a secret number stays the same.
const PY_RUNNER = `
import random

class _NeedInput(BaseException):
    pass

def _run_student(code, answers, seed):
    answers = list(answers)

    def _input(prompt=""):
        prompt = str(prompt)
        if not answers:
            raise _NeedInput(prompt)
        answer = answers.pop(0)
        print(prompt + answer)  # show the question and answer, like in a terminal
        return answer

    random.seed(seed)
    # A fresh scope each run, so variables from the last run don't linger
    scope = {"__name__": "__main__", "input": _input}
    try:
        exec(compile(code, "<exec>", "exec"), scope)
    except _NeedInput as e:
        return e.args[0]
    return None
`;

let pyodide = null;
let runStudent = null;

// Start Python and tell the page when it's ready
async function setup() {
    pyodide = await loadPyodide();
    pyodide.runPython(PY_RUNNER);
    runStudent = pyodide.globals.get("_run_student");
    postMessage({ type: "ready" });
}
setup();

// Runs every time the page sends code
onmessage = (event) => {
    const { code, inputs, seed } = event.data;
    let output = "";

    // Collect everything Python prints instead of sending it to the console
    pyodide.setStdout({batched: (text) => { if (output.length < 20000) output += text + "\n"; }});
    pyodide.setStderr({batched: (text) => { if (output.length < 20000) output += text + "\n"; }});

    try {
        // Returns the question if the program is waiting for input(), otherwise undefined
        const question = runStudent(code, inputs, seed);
        postMessage({ type: "result", output: output, error: null, needInput: question ?? null });
    } catch (err) {
        postMessage({ type: "result", output: output, error: err.message, needInput: null });
    }
};
