const TIMEOUT_MS = 5000;

let worker;
let ready;
let waiting = null;

// Starts a fresh worker. Called once at the start, and again after a stop.
function startWorker() {
    worker = new Worker(import.meta.env.BASE_URL + "worker.js");

    let markReady;
    ready = new Promise((resolve) => { markReady = resolve; });

    worker.onmessage = (event) => {
        const msg = event.data;
        if (msg.type === "ready") markReady();
        if (msg.type === "result" && waiting) {
            waiting(msg);
            waiting = null;
        }
    };
}
startWorker();

export async function runPython(code) {
    await ready; // Wait until python(worker) has loaded
    return new Promise((resolve) => {
        // If Python hasn't answered within 5 seconds: kill the worker and start a new one
        const timer = setTimeout(() => {
            waiting = null;
            worker.terminate();
            startWorker();
            resolve({ type: "result", output: "", error: null, timeout: true });
        }, TIMEOUT_MS);

        waiting = (msg) => {
            clearTimeout(timer); // the answer came in time, so stop the timer
            resolve(msg);
        };

        worker.postMessage({ code });
    });
}
