/* global importScripts, loadPyodide */
// Load Pyodide (Python in the browser) from a CDN
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

let pyodide = null;

// Start Python and tell the page when it's ready
async function setup() {
    pyodide = await loadPyodide();
    postMessage({ type: "ready" });
}
setup();

// Runs every time the page sends code
onmessage = (event) => {
    const code = event.data.code;
    let output = "";

    // Collect everything Python prints instead of sending it to the console
    pyodide.setStdout({batched: (text) => { if (output.length < 20000) output += text + "\n"; }});
    pyodide.setStderr({batched: (text) => { if (output.length < 20000) output += text + "\n"; }});

    // A fresh, empty "scope" each run, so variables from the later run don't linger
    const scope = pyodide.globals.get("dict")();

    try {
        pyodide.runPython(code, {globals: scope});
        postMessage({ type: "result", output: output, error: null });
    } catch (err) {
        postMessage({ type: "result", output: output, error: err.message });
    } finally {
        scope.destroy();
    }
};