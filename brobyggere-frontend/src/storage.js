const KEY = "brobyggere.v1";

// Read everything saved. Returns {} if nothing is there or if the browser blocks it
export function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
        return {};
    }
}

// Reads, lets "change" modify the object and saves again
export function updateProgress(change) {
    const progress = loadProgress();
    change(progress);
    try {
        localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
        // Private window or full storage: the course still works, just doesn't remember 
    }
}

export function clearProgress() {
    try {
        localStorage.removeItem(KEY);
    } catch {
        // Nothing to do
    }
}